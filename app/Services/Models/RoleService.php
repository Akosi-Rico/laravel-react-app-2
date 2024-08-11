<?php

namespace App\Services\Models;

use App\Models\Role;

class RoleService
{
    public function create(array $roleData, Role $role): object
    {
        return $role::canCreate($roleData);
    }

    public function update(array $roleData, Role $role): object
    {
        return $role::canUpdate($roleData);
    }

    public function destroy(string $id, Role $role): object
    {
        return $role::canDelete($id);
    }

    public function loadTable(): object
    {
        return Role::loadDataTableData();
    }
}
