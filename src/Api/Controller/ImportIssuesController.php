<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\AbstractIssue;
use FoskyM\IssueTracking\AbstractProgress;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use Illuminate\Contracts\Validation\Factory;
use FoskyM\IssueTracking\Api\Serializer\ProgressSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use FoskyM\IssueTracking\Model\Issue;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\User\User;
use Flarum\Discussion\Discussion;
use Flarum\Post\CommentPost;
use Carbon\Carbon;

class ImportIssuesController implements RequestHandlerInterface
{
    protected $settings;
    protected $platformHelper;
    protected $providerHelper;
    public function __construct(
        SettingsRepositoryInterface $settings,
        PlatformHelper $platformHelper,
        ProviderHelper $providerHelper
    ) {
        $this->settings = $settings;
        $this->platformHelper = $platformHelper;
        $this->providerHelper = $providerHelper;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();
        
        $provider = $this->settings->get('foskym-issue-tracking.provider');

        $sort = Arr::get($request->getQueryParams(), 'sort', 'latest');

        $issues = $this->providerHelper->getProvider($provider)
            ->getIssueList($sort, 0, 10000);

        $issues = array_map(function ($issue) use ($provider, $actor) {
            $issue = new Issue($issue);
            try {
                $relationship = DiscussionIssue::where('issue_id', $issue->id)
                    ->where('issue_provider', $provider)
                    ->firstOrFail();

                $issue->discussion = $relationship->discussion;
                $issue->discussion_id = $relationship->discussion_id;
            } catch (\Exception $e) {
                $user = $actor;
                $discussion = Discussion::start($issue->title, $user);
        
                $discussion->save();
        
                $post = CommentPost::reply(
                    $discussion->id,
                    $issue->description,
                    $user->id,
                    'localhost',
                    $user,
                );

                $post->created_at = new Carbon($issue->created_at);
        
                $post->save();

                $discussion->setRawAttributes($post->discussion->getAttributes(), true);
                $discussion->setFirstPost($post);
                $discussion->setLastPost($post);
        
                $discussion->save();

                $relationship = new DiscussionIssue();
                $relationship->issue_id = $issue->id;
                $relationship->discussion_id = $discussion->id;
                $relationship->issue_provider = $provider;
                $relationship->created_at = new Carbon();
                $relationship->updated_at = new Carbon();
                $relationship->is_imported = true;
                $relationship->save();
        
                $issue->discussion = $discussion;
                $issue->discussion_id = $discussion->id;
            }

            return $issue;
        }, $issues);

        $issues = array_filter($issues);

        return new JsonResponse([
            'data' => $issues,
        ]);
    }
}