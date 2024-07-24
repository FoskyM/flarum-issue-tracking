<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\IssueTracking\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\IssueTracking\AbstractPlatformProvider;
use InvalidArgumentException;

class ProviderSettingsSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'issue-tracking-settings';

    /**
     * {@inheritdoc}
     *
     * @param array $settings
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($settings)
    {
        return [
            'fields' => $settings['providers'],
            'errors' => $settings['errors'],
        ];
    }

    private function serializeProvider(AbstractPlatformProvider $provider)
    {
        return $provider->availableSettings();
    }

    public function getId($model)
    {
        return 'global';
    }
}
