<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Container\Container;
use FoskyM\IssueTracking\Helper\PlatformProviderCollection;

class PlatformProvider implements ExtenderInterface
{
    private $extendPlatformProviders = [];
    public function extend($container, $extension = null)
    {
        $container->resolving(
            PlatformProviderCollection::class,
            function (PlatformProviderCollection $collection, Container $container) {
                foreach ($this->extendPlatformProviders as $provider) {
                    $collection->addProvider($container->make($provider));
                }
            }
        );
    }
    public function provide($provider)
    {
        $this->extendPlatformProviders[] = $provider;
        return $this;
    }
}