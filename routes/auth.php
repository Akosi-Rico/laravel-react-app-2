<?php

use App\Http\Controllers\Access\LoginController;
use Illuminate\Support\Facades\Route;


Route::middleware(['isoGuest'])->group(function () {
    Route::get("/login", [LoginController::class, 'login'])->name("login");
    Route::post("/login/process", [LoginController::class, 'loginProcess'])->name("login.process");
});

Route::middleware(['isoLogin'])->group(function () {
    Route::post("/user/logout", [LoginController::class, 'logout'])->name("user.logout");
});
