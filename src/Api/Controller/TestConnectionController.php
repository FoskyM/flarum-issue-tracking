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
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use FoskyM\IssueTracking\AbstractIssue;
use FoskyM\IssueTracking\AbstractProgress;
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use Illuminate\Contracts\Validation\Factory;
use FoskyM\IssueTracking\Api\Serializer\ProgressSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use FoskyM\IssueTracking\Model\Issue;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Carbon\Carbon;

class TestConnectionController implements RequestHandlerInterface
{
    protected $settings;
    protected $platformHelper;
    protected $providerHelper;
    public function __construct(
        SettingsRepositoryInterface $settings,
        PlatformHelper $platformHelper,
        ProviderHelper $providerHelper
    ) {
        $this->settings = $settings;
        $this->platformHelper = $platformHelper;
        $this->providerHelper = $providerHelper;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        $provider = $this->settings->get('foskym-issue-tracking.provider');

        try {
            $can = $this->providerHelper->getProvider($provider)
                ->testConnection();
            if (!$can) {
                throw new \Exception('Connection failed');
            }
        } catch (\Exception $e) {
            throw new \Exception('Connection failed');
        }

        return new JsonResponse([
            'message' => 'Connection successful'
        ]);
    }
}