<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\UserRequest;
use App\Models\User;
use App\Services\Models\UserService;

class UserManagementController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    public function index()
    {
        return view("module.index");
    }

    public function store(UserRequest $request, User $user)
    {
        return $this->userService->create(request()->payload, $user);
    }

    public function update(UserRequest $request, User $user)
    {
        return $this->userService->update(request()->payload, $user);
    }

    public function destroy(User $user)
    {
        return $this->userService->destroy($user->id, $user);
    }
    
    public function generateTable()
    {
        return $this->userService->loadTable();
    }

    public function loadUserInfo()
    {
        return $this->userService->loginAuthInfo();
    }

    public function loadAuthPermissions()
    {
        return $this->userService->authPermissions();
    }
}
