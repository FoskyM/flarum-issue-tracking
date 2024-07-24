<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use FoskyM\IssueTracking\Extend\PlatformProvider;

class IssueTrackingProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton(PlatformProvider::class);
    }
}