<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'payment_name' => $this->payment_name,
            'account_name' => $this->account_name,
            'account_number' => $this->account_number ?? null,
            'phone_number' => $this->phone_number ?? null,
            'is_active' => $this->is_active,
        ];
    }
}
