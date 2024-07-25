# Issue Tracking

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/foskym/flarum-issue-tracking.svg)](https://packagist.org/packages/foskym/flarum-issue-tracking) [![Total Downloads](https://img.shields.io/packagist/dt/foskym/flarum-issue-tracking.svg)](https://packagist.org/packages/foskym/flarum-issue-tracking)

A [Flarum](http://flarum.org) extension. Issue tracking in Flarum.

![QQ_1721889365017](https://github.com/user-attachments/assets/1a27b9e2-c04d-492a-8a61-1be6c1bcbdca)


## Installation

Install with composer:

```sh
composer require foskym/flarum-issue-tracking:"*"
```

## Updating

```sh
composer update foskym/flarum-issue-tracking:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/foskym/flarum-issue-tracking)
- [GitHub](https://github.com/foskym/flarum-issue-tracking)
- [Discuss](https://discuss.flarum.org/d/34986-issue-tracking)


## How To Use?
Install this,
and then install the platform provider.

### Available Platform Provider
- [YouTrack](https://github.com/foskym/flarum-issue-tracking-youtrack)

Enable them and set the configs.

## How to make an provider?

### Require this package in your provider's `composer.json`
```json
"require": {
    "flarum/core": "^1.8.0",
    "foskym/flarum-issue-tracking": "*"
}
```

### Extend.php
```php
use Flarum\Extend;

return [
    new Extend\Locales(__DIR__.'/locale'),

    (new \FoskyM\IssueTracking\Extend\PlatformProvider())
        ->provide(PlatformProvider::class)
];
```

### Config in `PlatformProvider.php`
```php
// ...
use FoskyM\IssueTracking\AbstractPlatformProvider;
use FoskyM\IssueTracking\AbstractIssue;
use FoskyM\IssueTracking\AbstractProgress;
// ...

class PlatformProvider extends AbstractPlatformProvider
{
    public $key = "foskym-issue-tracking-youtrack";
    public $name = "YouTrack";

    public function availableSettings(): array
    {
        return [
            'url' => 'required|url',
            'token' => 'required',
            'project' => 'required',
            'state_field' => 'required',
            'resolved_state' => 'required',
        ];
    }
    // ...
}
```

### Locale
```yml
foskym-issue-tracking-youtrack:
  admin:
    fields:
      heading: "Issue Tracking: YouTrack"
      url_label: "YouTrack URL"
      token_label: "YouTrack Token"
      project_label: "YouTrack Project ID"
      state_field_label: "State Field"
      resolved_state_label: "Resolved State"
      # {$setting_key}_label: ...

      url_help: ...
      token_help: ...
      project_help: ...
      state_field_help: ...
      resolved_state_help: ...

      # {$setting_key}_help: ...
      # help text can be ignored

```

### Implementation
See [AbstractPlatformProvider.php](https://github.com/FoskyM/flarum-issue-tracking/blob/main/src/AbstractPlatformProvider.php)

And see [YouTrack's PlatformProvider.php](https://github.com/FoskyM/flarum-issue-tracking-youtrack/blob/main/src/PlatformProvider.php)

## Events for `Forum Quests` and other extensions
### Dispatch when user created an issue in `Flarum`
```php
class IssueCreated
{
    /**
     * @var User
     */
    public $actor;

    /**
     * @var \FoskyM\IssueTracking\Model\Issue
     */
    public $issue;

    /**
     * @var Discussion
     */
    public $discussion;
}
```

### Dispatch when user created an comment on issue in `Flarum`
```php
class CommentPosted
{
    /**
     * @var User
     */
    public $actor;

    /**
     * @var CommentPost
     */
    public $post;

    /**
     * @var string
     */
    public $issueId;
}
```
