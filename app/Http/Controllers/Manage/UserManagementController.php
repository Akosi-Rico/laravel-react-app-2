<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\UserRequest;
use App\Models\User;
use App\Services\Models\UserService;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    public function index()
    {
        $data = [
            "logo" => asset("image/logo.png"),
        ];

        return view("module.index", compact('data'));
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
}
