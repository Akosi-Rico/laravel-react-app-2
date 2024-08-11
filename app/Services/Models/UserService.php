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
}