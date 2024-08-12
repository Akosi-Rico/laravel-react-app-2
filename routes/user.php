<?php

use App\Http\Controllers\Manage\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['isoLogin'])->group(function () {
    Route::resource('/user', UserManagementController::class);
    Route::get("/user/auth/info", [UserManagementController::class, 'loadUserInfo'])->name("user.info");
    Route::get('/user/generate/table', [UserManagementController::class, 'generateTable'])->name("load.user.table");
    Route::get('/user/auth/permissions', [UserManagementController::class, 'loadAuthPermissions'])
        ->name("load.user.permissions");
});