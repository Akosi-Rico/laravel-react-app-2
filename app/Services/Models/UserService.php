<?php

namespace App\Services\Models;

use App\Models\User;

class UserService
{
    public function create(array $userData, User $user): object
    {
        return $user::canCreate($userData);
    }

    public function update(array $userData, User $user): object
    {
        return $user::canUpdate($userData);
    }

    public function destroy(string $id, User $user): object
    {
        return $user::canDelete($id);
    }

    public function loadTable(): object
    {
        return User::loadDataTableData();
    }

    public function login(array $userData, User $user): object
    {
        return $user::canLogin($userData);
    }

    public function logout()
    {
        auth()->guard()->logout();

        request()->session()->invalidate();

        request()->session()->regenerateToken();
    }

    public function loginAuthInfo()
    {
        return [
            "name" => auth()->guard()->user()->name,
            "currentDate" => now()->format('F j, Y'),
        ];
    }

    public function authPermissions()
    {
        return (auth()->check() ? auth()->guard()->user()->permissions->pluck("name") : []);
    }
}