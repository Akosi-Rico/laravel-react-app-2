<?php

use App\Http\Controllers\Manage\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['isoLogin', 'isoPermission'])->group(function () {
    Route::resource('/role', RoleController::class);
    Route::get('/role/generate/table', [RoleController::class, 'generateTable'])->name("load.role.table");
    Route::get('/load/all/roles', [RoleController::class, 'generateRoles'])->name("generate.role");
});