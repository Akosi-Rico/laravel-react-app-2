<?php

namespace App\Helpers\Access;

use App\Services\Models\UserService;

class AuthorizationAccess
{
    public static function loadPermission()
    {
        return (new UserService())->authPermissions();
    }
}
