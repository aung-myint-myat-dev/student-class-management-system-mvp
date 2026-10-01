<?php

use App\Models\StudentBank;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_bank_transcations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(StudentBank::class);
            $table->string('transcation_type');
            $table->date('date');
            $table->decimal('amount', 10);
            $table->string('description')->nullable();
            $table->string('payment_method')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_bank_transcations');
    }
};
