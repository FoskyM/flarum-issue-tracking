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

use Flarum\Database\AbstractModel;

class DiscussionIssue extends AbstractModel
{
    protected $table = 'discussion_issue';
    protected $primaryKey = 'discussion_id';
    protected $fillable = ['discussion_id', 'issue_id', 'issue_provider', 'created_at', 'updated_at', 'is_imported'];
    protected $dates = ['created_at', 'updated_at'];
    public $timestamps = true;

    public function discussion()
    {
        return $this->belongsTo('Flarum\Discussion\Discussion');
    }

    public static function findByIssueId($issueId)
    {
        return self::where('issue_id', $issueId)->firstOrFail();
    }
}