<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
        $student = $this->route('student');

        return [
            'classroom_id' => [
                'sometimes',
                'required',
                'integer',
                'exists:classrooms,id',
            ],

            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255'
            ],

            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('students', 'email')
                    ->ignore($student->id),
            ],

            'phone' => [
                'sometimes',
                'string',
                'max:12'
            ]
        ];
    }
}
