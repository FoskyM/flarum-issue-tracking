<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use FoskyM\IssueTracking\Api\Controller\ListIssuesController;
use FoskyM\IssueTracking\Api\Serializer\DiscussionIssueSerializer;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use FoskyM\IssueTracking\Modle\Issue;
use Flarum\Api\Serializer\DiscussionSerializer;
use FoskyM\IssueTracking\Api\Serializer\IssueSerializer;
use Flarum\Post\Event\Posted;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->route('/issues', 'issues'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\ServiceProvider())
        ->register(Provider\IssueTrackingProvider::class),

    (new Extend\Routes('forum'))
        ->get('/issue-tracking/test', 'issue-tracking.test', Controller\TestController::class),

    (new Extend\Routes('api'))
        ->get('/issue-tracking/settings', 'issue-tracking.settings', Api\Controller\ShowProviderSettingsController::class)
        ->get('/issue-tracking/issues', 'issue-tracking.issues', Api\Controller\ListIssuesController::class)
        ->get('/issue-tracking/issue', 'issue-tracking.issue', Api\Controller\ShowIssueController::class),

    (new Extend\ApiController(ListIssuesController::class))
        ->addInclude(['discussion', 'discussion.user']),

    (new Extend\Model(Discussion::class))
        ->relationship('discussion-issue', function ($discussion) {
            return $discussion->hasOne(DiscussionIssue::class, 'discussion_id');
        }),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude(['discussion-issue']),

    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->hasOne('discussion-issue', DiscussionIssueSerializer::class),

    (new Extend\Event)
        ->listen(Posted::class, Listener\CreateCommentWhenPosted::class)
];
