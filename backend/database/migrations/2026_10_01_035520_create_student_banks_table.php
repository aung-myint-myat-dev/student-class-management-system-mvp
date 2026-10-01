<?php

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
        Schema::create('student_banks', function (Blueprint $table) {
            $table->id();
            $table->string('student_code')->unique();
            $table->string('father_name');
            $table->string('student_name');
            $table->string('grade');
            $table->decimal('balance', 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_banks');
    }
};
