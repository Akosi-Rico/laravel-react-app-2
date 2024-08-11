<?php

namespace App\Services\Response;

use App\Contracts\Manage\TaskInterface;

class JsonOutput implements TaskInterface
{
    public function output($message, $code)
    {
        return response()->json([
            "message" => $message
        ], $code);
    }
}