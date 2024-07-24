<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\MessageBag;

abstract class AbstractPlatformProvider
{
    public $key;
    
    public $name;

    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function getSettings(): array
    {
        $settings = [];
        foreach ($this->availableSettings() as $key => $val) {
            $settings[$key] = $this->settings->get($this->key . '.' . $key);
        }
        return $settings;
    }

    public abstract function availableSettings(): array;

    public abstract function validateSettings(SettingsRepositoryInterface $settings, Factory $validator): MessageBag;

    public abstract function getIssueList(): array;

    public abstract function getIssue(string $issueId): AbstractIssue;

    public abstract function createIssue(User $actor, string $title, string $description): bool;

    public abstract function createComment(User $actor, string $issueId, string $content): bool;
}