<?php

namespace App\Http\Controllers\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\Access\LoginRequest;
use App\Models\User;
use App\Services\Models\UserService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct(private UserService $userService)
    {
    }

    public function login() 
    {
        return view("module.index");
    }

    public function loginProcess(LoginRequest $request, User $user)
    {
        return $this->userService->login(request()->payload, $user);
    }

    public function logout() 
    {
        return $this->userService->logout();
    }
}
