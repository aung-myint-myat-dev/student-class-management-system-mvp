<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TranscationResource extends JsonResource
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

            'student_bank_id' => $this->student_bank_id,

            'transcation_type' => $this->transcation_type,

            'date' => $this->date?->format('Y-m-d'),

            'amount' => $this->amount,

            'description' => $this->description,

            'payment_method' => $this->payment_method,

            'remaing_balance' => $this->remaing_balance,

            'images' => new TranscationImageResource($this->whenLoaded('images')),

            'created_at' => $this->created_at?->toISOString(),

            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
