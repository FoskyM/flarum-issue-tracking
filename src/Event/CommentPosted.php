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
use Flarum\Post\CommentPost;

class CommentPosted
{
    /**
     * @var User
     */
    public $actor;

    /**
     * @var CommentPost
     */
    public $post;

    /**
     * @var string
     */
    public $issueId;

    /**
     * @param User $user
     * @param CommentPost $post
     * @param string $issueId
     */
    public function __construct(User $actor, CommentPost $post, string $issueId)
    {
        $this->actor = $actor;
        $this->post = $post;
        $this->issueId = $issueId;
    }
}