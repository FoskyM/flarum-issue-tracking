<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use FoskyM\IssueTracking\AbstractPlatformProvider;
use InvalidArgumentException;
use Carbon\Carbon;
use FoskyM\IssueTracking\Model\Issue;

class IssueSerializer extends AbstractSerializer
{
    protected $type = 'issue-tracking-issues';

    protected function getDefaultAttributes($issue)
    {
        if (!($issue instanceof Issue)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Issue::class
            );
        }
        return [
            'id' => $issue->id,
            'slug' => $issue->slug,
            'title' => $issue->title,
            'description' => $issue->description,
            'author' => $issue->author,
            'assignee' => $issue->assignee,
            'state' => $issue->state,
            'priority' => $issue->priority,
            'type' => $issue->type,
            'created_at' => $this->formatDateTime($issue->created_at),
            'updated_at' => $this->formatDateTime($issue->updated_at),
            'resolved_at' => $this->formatDateTime($issue->resolved_at),
            'is_resolved' => $issue->is_resolved,
            'progress' => $issue->progress,
            'link' => $issue->link,
            'discussion_id' => $issue->discussion_id,
        ];
    }

    protected function discussion($issue)
    {
        return $this->hasOne($issue, DiscussionSerializer::class);
    }

    public function formatDateTime($date)
    {
        if (!$date instanceof \DateTime) {
            $date = Carbon::parse($date);
            $date = $date->toDateTime();
        }
        
        return parent::formatDate($date);
        
    }
}