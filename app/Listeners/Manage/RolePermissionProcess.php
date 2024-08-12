<?php

namespace App\Listeners\Manage;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\Models\Permission as SpatiePermission;
class RolePermissionProcess
{
    public function handle(object $event): void
    {
        if (!empty($event->role)) {
            $role = SpatieRole::findById($event->role);
            if (!empty($role)) {
                $permission = SpatiePermission::findById($event->permissionId);
                $role->givePermissionTo($permission);
            }
       }
    }
}
