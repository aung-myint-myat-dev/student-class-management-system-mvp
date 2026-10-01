<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'name' => $this->name,
            'student_cod' => $this->student_code,
            'father_name' => $this->father_name,
            'email' => $this->email,
            'phone' => $this->phone ?? 'No provided.',
            'class' => $this->whenLoaded('classroom'),
        ];
    }
}
