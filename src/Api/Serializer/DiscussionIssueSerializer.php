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
use FoskyM\IssueTracking\Model\DiscussionIssue;

class DiscussionIssueSerializer extends AbstractSerializer
{
    protected $type = 'issue-tracking-discussion-issue';

    protected function getDefaultAttributes($discussion_issue)
    {
        if (!($discussion_issue instanceof DiscussionIssue)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . DiscussionIssue::class
            );
        }

        return [
            'id' => $discussion_issue->id,
            'discussion_id' => $discussion_issue->discussion_id,
            'issue_id' => $discussion_issue->issue_id,
            'created_at' => $this->formatDateTime($discussion_issue->created_at),
            'updated_at' => $this->formatDateTime($discussion_issue->updated_at)
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