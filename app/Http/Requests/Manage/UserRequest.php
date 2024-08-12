<?php

namespace App\Http\Requests\Manage;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = (isset(request()["payload"]["id"]) ? request()["payload"]["id"] : null);
        return [
            "payload.name" => ["required"],
            "payload.email" => ["required", "email", "unique:users,email,$id"],
            "payload.password" => ["required_if:payload.isNewUser,true", 'confirmed'],

            "payload.role" => ["required_if:payload.isNewUser,true"],
            "payload.permission" => ["required_if:payload.isNewUser,true"],
        ];
    }

    public function messages()
    {
        return [
            "payload.name.required" => "Name is required, Please fill out the required field!",
            "payload.email.unique" => "This email has already been taken",
            "payload.email.required" => "Email is required, Please fill out the required field!",
            "payload.email.email" => "Email should be valid!",
            'payload.password.required_if' => "Password is required, Please fill out the required field!",
            'payload.password.confirmed' => "Password confirmation does not match.!",
            'payload.role.required_if' => "Role is required, Please fill out the required field!",
            'payload.permission.required_if' => "Permission is required, Please fill out the required field!",
        ];
    }
}
