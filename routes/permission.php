<?php

use App\Http\Controllers\Manage\PermissionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['isoLogin', 'isoPermission'])->group(function () {
    Route::resource('/permission', PermissionController::class);
    Route::get('/permission/generate/table', [PermissionController::class, 'generateTable'])
        ->name("load.permission.table");
    Route::get('/permission/generate/role', [PermissionController::class, 'generateAvailableRoles'])
        ->name("load.available.role");
    Route::post('/load/all/permission', [PermissionController::class, 'generatePermissions'])
        ->name("generate.permissions");
});