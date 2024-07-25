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

class ShowProgressController implements RequestHandlerInterface
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

        $discussion_id = Arr::get($request->getQueryParams(), 'id');

        $provider = $this->settings->get('foskym-issue-tracking.provider');

        try {
            $progress = $this->providerHelper->getProvider($provider)
                ->getLatestProgress();
            $updated_at = new Carbon($progress->updated_at);
            // format it to RFC3339
            $progress->updated_at = $updated_at->toRfc3339String();

            return new JsonResponse([
                'updated_at' => $progress->updated_at,
                'resolved' => $progress->resolved,
                'unresolved' => $progress->unresolved,
                'total' => $progress->total,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Progress not found',
            ], 404);
        }
    }
}