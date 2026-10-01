<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentBankTranscationImages extends Model
{
    protected $fillable = [
        'student_bank_transcation_id',
        'image_url',
    ];
}
