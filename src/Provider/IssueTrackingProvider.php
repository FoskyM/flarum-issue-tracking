<?php

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