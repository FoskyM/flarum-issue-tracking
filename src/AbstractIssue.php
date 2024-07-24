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

class AbstractIssue {
  public $id;
  public $slug;
  public $title;
  public $description;
  public $author;
  public $state;
  public $priority;
  public $type;
  public $created_at;
  public $updated_at;
  public $resolved_at;
}