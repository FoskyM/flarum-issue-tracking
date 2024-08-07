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

use FoskyM\IssueTracking\AbstractPlatformProvider;

class PlatformProviderCollection
{
    private array $extendProvider = [];
    /**
     * Register a provider.
     * @param AbstractPlatformProvider $provider
     */
    public function addProvider(AbstractPlatformProvider $provider): void
    {
        $this->extendProvider[$provider->key] = $provider;
    }
    /**
     * Get provider by key.
     * @param string $key
     * @return \FoskyM\IssueTracking\AbstractPlatformProvider|false
     */
    public function getProvider(string $key): AbstractPlatformProvider|false
    {
        if (!isset($this->extendProvider[$key])) {
            return false;
        }
        return $this->extendProvider[$key];
    }
    public function getProviderList(): array
    {
        return $this->extendProvider;
    }
}