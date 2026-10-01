<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentBankTranscation extends Model
{
    protected $fillable = [
        'student_bank_id',
        'transcation_type',
        'date',
        'amount',
        'description',
        'payment_method',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function bank(): BelongsTo
    {
        return $this->belongsTo(StudentBank::class, 'student_bank_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(StudentBankTranscationImages::class);
    }
}
