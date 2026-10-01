<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentBankController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('students', StudentController::class);
Route::get('/students/find/{student_code}', [StudentController::class, 'findByCode']);
Route::apiResource('classrooms', ClassroomController::class);
Route::apiResource('student-banks', StudentBankController::class);
