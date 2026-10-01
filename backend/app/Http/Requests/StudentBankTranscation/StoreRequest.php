<?php

namespace App\Http\Requests\StudentBankTranscation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'student_bank_id' => ['required', 'exists:student_banks,id'],
            'transcation_type' => ['required', 'string'],
            'date' => ['required', 'date'],
            'amount' => ['required', 'decimal:0,2'],
            'description' => ['required', 'string', 'max:100'],
            'images' => ['nullable', 'array', 'max:5'],
            'imeages.*' => ['nullable', 'image', 'mimes:png,jpg', 'max:2024']
        ];
    }
}
