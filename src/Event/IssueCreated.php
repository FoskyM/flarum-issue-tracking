<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Event;

use Flarum\User\User;
use FoskyM\IssueTracking\Model\Issue;
use Flarum\Discussion\Discussion;

class IssueCreated
{
    /**
     * @var User
     */
    public $actor;

    public $issue;

    public $discussion;

    /**
     * @param User $user
     * @param Issue $issue
     * @param Discussion $discussion
     */
    public function __construct(User $actor, Issue $issue, Discussion $discussion)
    {
        $this->actor = $actor;
        $this->issue = $issue;
        $this->discussion = $discussion;
    }
}