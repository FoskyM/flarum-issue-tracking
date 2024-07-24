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
use FoskyM\IssueTracking\Helper\ProviderHelper;
use FoskyM\IssueTracking\Helper\PlatformHelper;
use Illuminate\Contracts\Validation\Factory;
use FoskyM\IssueTracking\Api\Serializer\IssueSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use FoskyM\IssueTracking\Model\DiscussionIssue;
use FoskyM\IssueTracking\Model\Issue;

class ShowIssueController extends AbstractShowController
{
    public $serializer = IssueSerializer::class;
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

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $discussion_id = Arr::get($request->getQueryParams(), 'id');

        $provider = $this->settings->get('foskym-issue-tracking.provider');

        try {
            $disscussionIssue = DiscussionIssue::where('discussion_id', $discussion_id)
            ->where('issue_provider', $provider)
            ->firstOrFail();

            $issue = $this->providerHelper->getProvider($provider)->getIssue($disscussionIssue->issue_id);

            $issue = new Issue($issue);
            $issue->discussion_id = $discussion_id;

            return $issue;
        } catch (\Exception $e) {
            
        }
    }
}