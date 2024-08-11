<?php

namespace App\Models;

use App\Helpers\Manage\TaskHelper;
use App\Services\Response\JsonOutput;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class Role extends Model
{
    use HasFactory, TaskHelper;
    static $guard = 'web';

    public static function loadDataTableData()
    {
        try {
            $data = self::select("id", "name", "created_at")->get();
            
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
            $role = new self();
            $role->name = $request["name"];
            $role->guard_name = self::$guard;
            $role->save();
            
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

            $role = self::where("id", $request["id"])->first();
            if (empty($role)) {
                return false;
            }

            $role->name = $request["name"];
            $role->save();
            
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

            $role = self::where("id", $id)->first();
            if (empty($role)) {
                return false;
            }

            $role->delete();

            DB::commit();            
            return self::loadResponse("Transaction Successully", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            DB::rollback();
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function showAvailableRole()
    {
        return self::select("id", "name")->get();
    }
}
