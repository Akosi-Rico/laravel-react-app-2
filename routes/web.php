<?php

use App\Http\Controllers\Manage\PermissionController;
use App\Http\Controllers\Manage\RoleController;
use App\Http\Controllers\Manage\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::resource('/user', UserManagementController::class);
Route::get('/user/generate/table', [UserManagementController::class, 'generateTable'])->name("load.user.table");

Route::resource('/role', RoleController::class);
Route::get('/role/generate/table', [RoleController::class, 'generateTable'])->name("load.role.table");


Route::resource('/permission', PermissionController::class);
Route::get('/permission/generate/table', [PermissionController::class, 'generateTable'])->name("load.permission.table");
Route::get('/permission/generate/role', [PermissionController::class, 'generateAvailableRole'])
    ->name("load.available.role");