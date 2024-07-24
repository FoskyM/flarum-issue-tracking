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

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\AbstractIssue;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use Illuminate\Contracts\Validation\Factory;
use FoskyM\IssueTracking\Api\Serializer\IssueSerializer;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use FoskyM\IssueTracking\Model\Issue;
use Flarum\Discussion\Discussion;
use Flarum\Post\CommentPost;
use Carbon\Carbon;

class CreateIssueController extends AbstractCreateController
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
        $actor->assertRegistered();

        if ($this->settings->get('foskym-issue-tracking.enable_create_issue') == '0') {
            $actor->assertAdmin();
        }

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes');

        $provider = $this->settings->get('foskym-issue-tracking.provider');

        $issue = $this->providerHelper->getProvider($provider)
            ->createIssue($actor, Arr::get($attributes, 'title'), Arr::get($attributes, 'content'));

        $issue = new Issue($issue);

        $discussion = Discussion::start($issue->title, $actor);

        $discussion->save();

        $post = CommentPost::reply(
            $discussion->id,
            $issue->description,
            $actor->id,
            'localhost',
            $actor,
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

        return $issue;
    }
}
