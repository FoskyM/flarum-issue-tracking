<?php
namespace FoskyM\IssueTracking\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Container\Container;
use FoskyM\IssueTracking\Helper\PlatformProviderCollection;

class PlatformProvider implements ExtenderInterface
{
    private array $extendPlatformProviders = [];
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