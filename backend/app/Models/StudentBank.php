<?php

namespace App\Models;

use Database\Factories\StudentBankFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    protected $casts = [
        'balance' => 'decimal:2'
    ];

    public function transcations(): HasMany
    {
        return $this->hasMany(StudentBankTranscation::class);
    }
}
