<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\RoleRequest;
use App\Models\Role;
use App\Services\Models\RoleService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct(private RoleService $roleService)
    {
    }

    public function index()
    {
        $data = [
            "logo" => asset("image/logo.png"),
        ];

        return view("module.index", compact('data'));
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
}
