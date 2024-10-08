<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\RoleRequest;
use App\Models\Role;
use App\Services\Models\RoleService;

class RoleController extends Controller
{
    public function __construct(private RoleService $roleService)
    {
    }

    public function index()
    {
        return view("module.index");
    }

    public function store(RoleRequest $request, Role $role)
    {
        return $this->roleService->create(request()->payload, $role);
    }

    public function update(RoleRequest $request, Role $role)
    {
        return $this->roleService->update(request()->payload, $role);
    }

    public function destroy(Role $role)
    {
        return $this->roleService->destroy($role->id, $role);
    }

    public function generateTable()
    {
        return $this->roleService->loadTable();
    }

    public function generateRoles()
    {
        return $this->roleService->loadRole();
    }
}
