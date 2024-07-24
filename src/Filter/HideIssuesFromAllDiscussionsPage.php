<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Filter;

use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;
use Foskym\IssueTracking\Model\DiscussionIssue;

class HideIssuesFromAllDiscussionsPage
{
    public function __invoke(FilterState $filter, QueryCriteria $queryCriteria)
    {
        if (count($filter->getActiveFilters()) > 0) {
            return;
        }

        $filter->getQuery()->whereNotIn('discussions.id', function ($query) {
            return $query->select('discussion_id')
            ->from('discussion_issue');
        });
    }
}