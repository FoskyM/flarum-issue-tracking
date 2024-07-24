<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Helper;

use Carbon\Carbon;
use Flarum\Database\Eloquent\Collection;
use Flarum\User\User;
use Illuminate\Events\Dispatcher;

class PlatformHelper
{
    public ProviderHelper $providerHelper;
    public Dispatcher $events;
    public function __construct(ProviderHelper $providerHelper, Dispatcher $events)
    {
        $this->providerHelper = $providerHelper;
        $this->events = $events;
    }
}