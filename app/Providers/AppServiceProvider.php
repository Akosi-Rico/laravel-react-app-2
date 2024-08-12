<?php

namespace App\Providers;

use App\Events\Manage\RolePermissionEvent;
use App\Listeners\Manage\RolePermissionProcess;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\Manage\RestrictionEvent;
use App\Listeners\Manage\PermissionProcess;
use App\Listeners\Manage\RoleProcess;
class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Event::listen(RolePermissionEvent::class, RolePermissionProcess::class);
        Event::listen(RestrictionEvent::class, PermissionProcess::class);
        Event::listen(RestrictionEvent::class, RoleProcess::class);
    }
}
