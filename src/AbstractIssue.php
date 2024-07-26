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

class AbstractIssue implements \ArrayAccess {
  public string $id;
  public string $slug;
  public string $title;
  public string $description;
  public AbstractUser $author;
  public AbstractUser $assignee;
  public AbstractLabel $state;
  public AbstractLabel $priority;
  public AbstractLabel $type;
  public $created_at;
  public $updated_at;
  public $resolved_at;
  public bool $is_resolved;
  public float $progress;
  public string $link;
  public function offsetExists(mixed $offset): bool {
    return isset($this->$offset);
  }

  public function offsetGet(mixed $offset): mixed {
    return $this->$offset;
  }

  public function offsetSet(mixed $offset, mixed $value): void {
    $this->$offset = $value;
  }

  public function offsetUnset(mixed $offset): void {
    $this->$offset = null;
  }
}