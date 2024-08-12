<?php

namespace App\Services\Models;

use App\Models\Permission;
use App\Models\Role;

class PermissionService
{
    public function create(array $permissionData, Permission $permission): object
    {
        return $permission::canCreate($permissionData);
    }

    public function update(array $permissionData, Permission $permission): object
    {
        return $permission::canUpdate($permissionData);
    }

    public function destroy(string $id, Permission $permission): object
    {
        return $permission::canDelete($id);
    }

    public function loadTable(): object
    {
        return Permission::loadDataTableData();
    }

    public function loadAvailableRoles(): object
    {   
        return Role::loadRoles();
    }

    public function loadPermissions(string $roleId = null): object
    {
        return Permission::loadPermissions($roleId);
    }
}
