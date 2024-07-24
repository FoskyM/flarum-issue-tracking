<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Model;

use FoskyM\IssueTracking\AbstractIssue;
use Flarum\Database\AbstractModel;

class Issue extends AbstractIssue {
  public $discussion_id;
  public function __construct($issue) {
    $this->id = $issue->id;
    $this->slug = $issue->slug;
    $this->title = $issue->title;
    $this->description = $issue->description;
    $this->author = $issue->author;
    $this->state = $issue->state;
    $this->priority = $issue->priority;
    $this->type = $issue->type;
    $this->created_at = $issue->created_at;
    $this->updated_at = $issue->updated_at;
    $this->resolved_at = $issue->resolved_at;
  }
}