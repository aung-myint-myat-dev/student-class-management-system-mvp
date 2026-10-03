<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class StudentBankTranscationImages extends Model
{
    protected $fillable = [
        'student_bank_transcation_id',
        'image_url',
    ];

    protected function imageUrl(): Attribute
{
    return Attribute::make(
        get: fn (?string $value) => $value
            ? Storage::disk('public')->url($value)
            : null,
    );
}
}
