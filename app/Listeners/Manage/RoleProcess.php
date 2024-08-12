<?php

namespace App\Listeners\Manage;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Spatie\Permission\Models\Role as SpatieRole;
class RoleProcess
{
    public function handle(object $event): void
    {
        if (!empty($event->role)) {
            $user = User::where("id", $event->userId)->first();
            $role = SpatieRole::findById($event->role);
            if (!empty($user) && !empty($role)) {
                $user->assignRole($role->name);
            }
       }
    }
}
