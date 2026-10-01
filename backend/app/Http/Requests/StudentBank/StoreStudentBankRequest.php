<?php

namespace App\Http\Requests\StudentBank;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentBankRequest extends FormRequest
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
            'student_code' => [
                'bail',
                'required',
                'string',
                'exists:students,student_code',
                'unique:student_banks,student_code',
            ],

            'student_name' => [
                'required',
                'string',
            ],

            'father_name' => [
                'required',
                'string',
            ],

            'grade' => [
                'required',
                'string',
            ],

            'balance' => [
                'required',
                'decimal:0,2',
            ],
        ];
    }
}
