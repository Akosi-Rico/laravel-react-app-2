<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
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
            $data = self::select("id", "name", "email", "created_at")
                        //->where("user_id", auth()->user()->id)
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
}
