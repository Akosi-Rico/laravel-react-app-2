<?php

namespace App\Models;

use App\Helpers\Manage\TaskHelper;
use App\Services\Response\JsonOutput;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Events\Manage\RolePermissionEvent;
use Spatie\Permission\Models\Role as SpatieRole;
class Permission extends Model
{
    use HasFactory, TaskHelper;

    static $guard = 'web';

    public static function loadDataTableData()
    {
        try {
            $data = self::select("id", "name", "created_at")
                        ->get();
            return self::loadResponse($data, Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function canCreate($request)
    {
        try {
            DB::beginTransaction();

            if (empty($request)) {
                return false;
            }
            $permission = new self();
            $permission->name = $request["name"];
            $permission->guard_name = self::$guard;
            $permission->save();

            event(new RolePermissionEvent($request["role"], $permission->id));
            DB::commit();            
            return self::loadResponse("Transaction Successully", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            DB::rollback();
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function canUpdate($request)
    {
        try {
            DB::beginTransaction();

            $permission = self::where("id", $request["id"])->first();
            if (empty($permission)) {
                return false;
            }

            $permission->name = $request["name"];
            $permission->save();
            
            event(new RolePermissionEvent($request["role"], $permission->id));
            DB::commit();            
            return self::loadResponse("Transaction Successully", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            DB::rollback();
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function canDelete($id)
    {
        try {
            DB::beginTransaction();

            $permission = self::where("id", $id)->first();
            if (empty($permission)) {
                return false;
            }

            $permission->delete();

            DB::commit();            
            return self::loadResponse("Transaction Successully", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            DB::rollback();
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function loadPermissions($roleId)
    {
        if (empty($roleId)) {
            return (object)["id" => 0, "name" => "No Permission Available" ];
        }

        $role = SpatieRole::findById($roleId);
        if (!empty($role)) {
            return response()->json($role->permissions);
        }
    }
}
