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

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\IssueTracking\Api\Serializer\IssueSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Model\Issue;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use Flarum\User\User;
use Flarum\Discussion\Discussion;
use Flarum\Post\CommentPost;
use Carbon\Carbon;

class ListIssuesController extends AbstractListController
{
    public $serializer = IssueSerializer::class;
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
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $provider = $this->settings->get('foskym-issue-tracking.provider');

        $issues = $this->providerHelper->getProvider($provider)->getIssueList();

        $issues = array_map(function ($issue) use ($provider) {
            $issue = new Issue($issue);
            try {
                $relationship = DiscussionIssue::where('issue_id', $issue->id)
                    ->where('issue_provider', $provider)
                    ->firstOrFail();

                $issue->discussion = $relationship->discussion;
            } catch (\Exception $e) {
                $user = User::find(1);
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
                $relationship->save();
        
                $issue->discussion = $discussion;
                $issue->discussion_id = $discussion->id;
            }

            return $issue;
        }, $issues);

        return $issues;
    }
}