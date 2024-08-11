<?php

namespace App\Helpers\Manage;

use App\Contracts\Manage\TaskInterface;

trait TaskHelper
{
    public static function loadResponse($message, $code, TaskInterface $format)
    {
        return $format->output($message, $code);
    }
}