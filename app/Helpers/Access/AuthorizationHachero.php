<?php

namespace App\Helpers\Access;

use App\Services\Models\UserService;

class AuthorizationHachero
{
    public static function loadPermission()
    {
        return (new UserService())->authPermissions();
    }
}
