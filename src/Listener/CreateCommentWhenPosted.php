<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Listener;

use Flarum\Notification\NotificationSyncer;
use FoskyM\IssueTracking\Event\CommentPosted;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Post\Event\Posted;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Illuminate\Contracts\Events\Dispatcher as EventDispatcher;

class CreateCommentWhenPosted
{
    protected $settings;
    protected $bus;
    protected $events;
    protected $platformHelper;
    protected $providerHelper;
    public function __construct(
        SettingsRepositoryInterface $settings,
        BusDispatcher $bus,
        EventDispatcher $events,
        PlatformHelper $platformHelper,
        ProviderHelper $providerHelper
    ) {
        $this->settings = $settings;
        $this->bus = $bus;
        $this->events = $events;
        $this->platformHelper = $platformHelper;
        $this->providerHelper = $providerHelper;
    }

    public function handle(Posted $event)
    {
        $user = $event->actor;
        $post = $event->post;

        if ($post->type !== 'comment') {
            return;
        }

        if ($this->settings->get('foskym-issue-tracking.provider') === null) {
            return;
        }

        $discussion = $post->discussion;

        try {
            $discussionIssue = DiscussionIssue::where('discussion_id', $discussion->id)
                ->where('issue_provider', $this->settings->get('foskym-issue-tracking.provider'))
                ->firstOrFail();

            $issueId = $discussionIssue->issue_id;

            $this->events->dispatch(
                new CommentPosted($user, $post, $issueId)
            );

            if ($this->settings->get('foskym-issue-tracking.enable_comment_sync') !== '1') {
                return;
            }

            $content = htmlspecialchars($post->content);

            $comment = $this->providerHelper->getProvider(
                $this->settings->get('foskym-issue-tracking.provider')
            )->createComment($user, $issueId, $content);
        } catch (\Exception $e) {
            // Do nothing
        }
    }
}