<?php

namespace App\Http\Requests\Payment;

use App\PaymentType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePaymentRequest extends FormRequest
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
            'type' => [
                'required',
                Rule::enum(PaymentType::class),
            ],

            'payment_name' => [
                'required',
                'string',
                'max:255',
            ],

            'account_name' => [
                'required',
                'string',
                'max:255',
            ],

            'account_number' => [
                'nullable',
                Rule::requiredIf(fn () => $this->type === PaymentType::BANKING->value),
                'string',
                'max:255',
                'min:3'
            ],

            'phone_number' => [
                'nullable',
                Rule::requiredIf(fn () => $this->type === PaymentType::MOBILE->value),
                'string',
                'max:255',
                'min:3'
            ],
        ];
    }
}
