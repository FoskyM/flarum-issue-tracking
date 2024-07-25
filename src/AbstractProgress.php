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

class AbstractProgress {
  public $updated_at;
  public int $resolved = 0;
  public int $unresolved = 0;
  public int $total = 0;
}