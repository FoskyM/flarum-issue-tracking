<?php

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