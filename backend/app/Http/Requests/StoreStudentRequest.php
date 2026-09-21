<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'classroom_id' => [
                'bail',
                'required',
                'integer',
                'exists:classrooms,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255'
            ],

            'email' => [
                'required',
                'email',
                'unique:students,email',
            ], 

            'phone' => [
                'nullable',
                'string',
                'min:6',
                'max:12'
            ]
        ];
    }

    public function messages()
    {
        return [
            'classroom_id.exists' => 'Class is required.',
            'classroom_id.required' => 'Class is invalid.',
        ];
    }
}
