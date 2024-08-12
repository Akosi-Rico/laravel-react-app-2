<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\PermissionRequest;
use App\Models\Permission;
use App\Services\Models\PermissionService;

class PermissionController extends Controller
{
    public function __construct(private PermissionService $permissionService)
    {
    }

    public function index()
    {
        return view("module.index");
    }

    public function store(PermissionRequest $request, Permission $permission)
    {
        return $this->permissionService->create(request()->payload, $permission);
    }

    public function update(PermissionRequest $request, Permission $permission)
    {
        return $this->permissionService->update(request()->payload, $permission);
    }

    public function destroy(Permission $permission)
    {
        return $this->permissionService->destroy($permission->id, $permission);
    }

    public function generateTable()
    {
        return $this->permissionService->loadTable();
    }

    public function generateAvailableRoles()
    {
        return $this->permissionService->loadAvailableRoles();
    }

    public function generatePermissions()
    {
        return $this->permissionService->loadPermissions(request()->payload["roleId"]);
    }
}
