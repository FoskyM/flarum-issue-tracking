<?php

namespace FoskyM\IssueTracking;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\MessageBag;

abstract class AbstractPlatformProvider
{
    public $key;
    
    public $name;

    public abstract function availableSettings(): array;

    public abstract function validateSettings(SettingsRepositoryInterface $settings, Factory $validator): MessageBag;

    public abstract function getIssueList(): array;
}