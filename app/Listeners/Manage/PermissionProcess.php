<?php

namespace App\Listeners\Manage;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Spatie\Permission\Models\Permission as SpatiePermission;

class PermissionProcess
{
    public function handle(object $event): void
    {
        if (!empty($event->role)) {
            $user = User::where("id", $event->userId)->first();
            $permission = SpatiePermission::findById($event->permissionId);
            if (!empty($user) && !empty($permission)) {
                $user->givePermissionTo($permission->name);
            }
       }
    }
}
