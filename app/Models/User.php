<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Events\Manage\RestrictionEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use App\Helpers\Manage\TaskHelper;
use App\Services\Response\JsonOutput;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, TaskHelper;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function loadDataTableData()
    {
        try {
            $data = self::select(
                        "users.id", 
                        "users.name", 
                        "users.email", 
                        "users.created_at",
                        DB::raw("group_concat(distinct ' ', p.name,' ') as Permissions"),
                        DB::raw("group_concat(distinct ' ', r.name,' ') as Roles"),
                    )
                    ->leftJoin("model_has_permissions as mp", "mp.model_id", "users.id")
                    ->leftJoin("permissions as p", "p.id", "mp.permission_id")
                    ->leftJoin("model_has_roles as mr", "mr.model_id", "users.id")
                    ->leftJoin("roles as r", "r.id", "mr.role_id")
                    ->groupBy("users.id")
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

            $user = new self();
            $user->name = $request["name"];
            $user->email = $request["email"];
            $user->password = Hash::make($request['password']);
            $user->save();
            
            event(new RestrictionEvent($user->id, $request["role"], $request["permission"]));
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

            $user = self::where("id", $request["id"])->first();
            if (empty($user)) {
                return false;
            }

            $user->name = $request["name"];
            $user->email = $request["email"];
            $user->save();
            
            event(new RestrictionEvent($user->id, $request["role"], $request["permission"]));
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

            $user = self::where("id", $id)->first();
            if (empty($user)) {
                return false;
            }

            $user->delete();

            DB::commit();            
            return self::loadResponse("Transaction Successully", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            DB::rollback();
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }

    public static function canLogin($request) 
    {
        try {
            if (empty($request)) {
                return false;
            }

            auth()->guard()->attempt(["email" => $request["email"], "password" => $request["password"]]);
            if (empty(auth()->guard()->check())) {
                throw new \Exception("Email & Password given is not registered");
            }

           return self::loadResponse("Successfully Login!", Response::HTTP_OK, new JsonOutput);
        } catch(\Throwable $th) {
            return self::loadResponse($th->getMessage(), Response::HTTP_BAD_REQUEST, new JsonOutput);
        }
    }
}
