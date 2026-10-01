<?php

namespace App\Models;

use Database\Factories\StudentBankFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentBank extends Model
{
    /** @use HasFactory<StudentBankFactory> */
    use HasFactory;

    protected $fillable = [
        'student_code',
        'student_name',
        'father_name',
        'grade',
        'balance',
    ];
}
