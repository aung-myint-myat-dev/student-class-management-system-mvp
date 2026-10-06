<?php

namespace App\Models;

use App\PaymentType;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'type',
        'payment_name',
        'account_name',
        'account_number',
        'phone_number',
        'is_active',
    ];

    protected $casts = [
        'type' => PaymentType::class,
        'is_active' => 'boolean',
    ];

    protected $attributes = [
        'is_active' => true,
    ];
}
