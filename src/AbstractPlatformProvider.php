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
    /**
     * @var string
     * The key of the provider.
     * Recommended to use the same key as the extension.
     */
    public $key;

    /**
     * @var string
     * The name of the provider, will be displayed in the admin panel.
     */
    public $name;
    protected $settings;

    public final function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * Get the provider settings.
     * @return array
     */
    public final function getSettings(): array
    {
        $settings = [];
        foreach ($this->availableSettings() as $key => $val) {
            $settings[$key] = $this->settings->get($this->key . '.' . $key);
        }
        return $settings;
    }

    /**
     * Validate the provider settings.
     * @param SettingsRepositoryInterface $settings
     * @param Factory $validator
     * @return MessageBag
     */
    public final function validateSettings(SettingsRepositoryInterface $settings, Factory $validator): MessageBag
    {
        $rules = [];
        foreach ($this->availableSettings() as $key => $val) {
            $rules[$this->key . '.' . $key] = $val;
        }
        return $validator->make($settings->all(), $rules)->errors();
    }

    /**
     * Get the list of available settings.
     * The key is the setting name, the value is the validation rule.
     * Example: ['api_key' => 'required|string']
     * @return array
     */
    public abstract function availableSettings(): array;

    /**
     * Get the list of issues.
     * Array of AbstractIssue.
     * @return array
     */
    public abstract function getIssueList(): array;

    /**
     * Get the issue by ID.
     * @param string $issueId
     * @return AbstractIssue
     */
    public abstract function getIssue(string $issueId): AbstractIssue;

    /**
     * Create a new issue.
     * @param User $actor
     * @param string $title
     * @param string $description
     * @return AbstractIssue
     */
    public abstract function createIssue(User $actor, string $title, string $description): AbstractIssue;

    /**
     * Create a new comment on an issue.
     * @param User $actor
     * @param string $issueId
     * @param string $content
     * @return bool
     */
    public abstract function createComment(User $actor, string $issueId, string $content): bool;
}