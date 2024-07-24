<?php

/*
 * This file is part of foskym/flarum-issue-tracking.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'discussion_issue',
    function (Blueprint $table) {
        $table->increments('id');
        $table->integer('discussion_id')->unsigned();
        $table->string('issue_id', 200);
        $table->string('issue_provider', 200);

        // created_at & updated_at
        $table->timestamps();
    }
);

