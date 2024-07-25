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

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\User;
use FoskyM\IssueTracking\AbstractPlatformProvider;
use FoskyM\IssueTracking\Helper\PlatformProviderCollection;

class ProviderHelper
{
    protected Translator $translator;
    protected PlatformProviderCollection $collection;
    public function __construct(PlatformProviderCollection $collection, Translator $translator)
    {
        $this->translator = $translator;
        $this->collection = $collection;
    }

    /**
     * Get all providers.
     * @return array
     */
    public function getProviders(): array
    {
        return $this->collection->getProviderList();
    }

    /**
     * Get all provider keys.
     * @return array
     */
    public function getProviderKeys(): array
    {
        $providers = $this->collection->getProviderList();
        $keys = [];
        foreach ($providers as $provider) {
            $keys[] = $provider->key;
        }
        return $keys;
    }

    /**
     * Get provider by name.
     * @param string $key
     * @throws \Flarum\Foundation\ValidationException
     * @return \FoskyM\IssueTracking\AbstractPlatformProvider
     */
    public function getProvider(string $key): AbstractPlatformProvider
    {
        $result = $this->collection->getProvider($key);
        if ($result === false) {
            throw new ValidationException(["provider" => $this->translator->trans("foskym-issue-tracking.forum.provider.error.title")]);
        }
        return $result;
    }
    /**
     * Check if provider exists
     * @param string $key
     * @return bool
     */
    public function hasProvider(string $key): bool
    {
        if (!$key)
            return false;
        $providers = $this->collection->getProviderList();
        return isset($providers[$key]);
    }
}
