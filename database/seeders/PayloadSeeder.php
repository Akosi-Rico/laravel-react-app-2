<?php

namespace Database\Seeders;

use App\Events\Manage\RestrictionEvent;
use App\Events\Manage\RolePermissionEvent;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PayloadSeeder extends Seeder
{
    
    public function run(): void
    {
        // Initial User
        $user = new User();
        $user->name = "Admin";
        $user->email = "admin@gmail.com";
        $user->password = Hash::make("testing");
        $user->save();

        // Initial Role
        $role = new Role();
        $role->name = "Admin";
        $role->guard_name = Role::$guard;
        $role->save();

        //Initial Permission
        $permission = new Permission();
        $permission->name = "Full Access";
        $permission->guard_name = Permission::$guard;
        $permission->save();

        event(new RolePermissionEvent($role->id, $permission->id));
        event(new RestrictionEvent($user->id, $role->id, $permission->id));
    }
}
