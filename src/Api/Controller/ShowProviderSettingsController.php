<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use FoskyM\IssueTracking\Api\Serializer\ProviderSettingsSerializer;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use Illuminate\Contracts\Validation\Factory;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowProviderSettingsController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = ProviderSettingsSerializer::class;

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertAdmin();

        $settings = self::$container->make(SettingsRepositoryInterface::class);
        $providerHelpers = self::$container->make(ProviderHelper::class);
        $validator = self::$container->make(Factory::class);
        $providers = [];
        foreach ($providerHelpers->getProviders() as $provider) {
            $providers[$provider->key] = [
                'name' => $provider->name,
                'settings' => $provider->availableSettings()
            ];
        }

        if ($settings->get('foskym-issue-tracking.provider') === null && count($providers) > 0) {
            $settings->set('foskym-issue-tracking.provider', array_keys($providers)[0]);
        }

        try {
            $provider = $providerHelpers->getProvider($settings->get('foskym-issue-tracking.provider'));
            $errors = $provider->validateSettings($settings, $validator);
        } catch (\Exception $e) {
            $provider = null;
            $errors = [];
        }

        return [
            'providers' => $providers,
            'errors' => $errors,
        ];
    }
}
