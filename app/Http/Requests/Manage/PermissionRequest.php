<?php

namespace App\Http\Requests\Manage;

use Illuminate\Foundation\Http\FormRequest;

class PermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = (isset(request()["payload"]["id"]) ? request()["payload"]["id"] : null);
        return [
            "payload.name" => ["required","unique:permissions,name,$id"],
        ];
    }

    public function messages()
    {
        return [
            "payload.name.required" => "Permission Name is required, Please fill out the required field!",
            "payload.name.unique" => "This Permission Name has already been taken",
        ];
    }
}
