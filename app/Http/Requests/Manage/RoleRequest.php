<?php

namespace App\Http\Requests\Manage;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = (isset(request()["payload"]["id"]) ? request()["payload"]["id"] : null);
        return [
            "payload.name" => ["required","unique:roles,name,$id"],
        ];
    }

    public function messages()
    {
        return [
            "payload.name.required" => "Role Name is required, Please fill out the required field!",
            "payload.name.unique" => "This Role Name has already been taken",
        ];
    }
}
