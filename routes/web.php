<?php

use App\Http\Controllers\Access\LoginController;
use App\Http\Controllers\Manage\PermissionController;
use App\Http\Controllers\Manage\RoleController;
use App\Http\Controllers\Manage\UserManagementController;
use Illuminate\Support\Facades\Route;

require base_path('/routes/auth.php');

Route::middleware(['isoLogin'])->group(function () {
    Route::resource('/user', UserManagementController::class);
    Route::get("/user/auth/info", [UserManagementController::class, 'loadUserInfo'])->name("user.info");
    Route::get('/user/generate/table', [UserManagementController::class, 'generateTable'])->name("load.user.table");

    Route::resource('/role', RoleController::class);
    Route::get('/role/generate/table', [RoleController::class, 'generateTable'])->name("load.role.table");
    Route::get('/load/all/roles', [RoleController::class, 'generateRoles'])->name("generate.role");

    Route::resource('/permission', PermissionController::class);
    Route::get('/permission/generate/table', [PermissionController::class, 'generateTable'])
        ->name("load.permission.table");
    Route::get('/permission/generate/role', [PermissionController::class, 'generateAvailableRoles'])
        ->name("load.available.role");
    Route::post('/load/all/permission', [PermissionController::class, 'generatePermissions'])
        ->name("generate.permissions");

    Route::post("/user/logout", [LoginController::class, 'logout'])->name("user.logout");
});
 