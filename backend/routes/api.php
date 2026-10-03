<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentBankController;
use App\Http\Controllers\StudentBankTranscationController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('students', StudentController::class);

Route::post('transcations', [StudentBankTranscationController::class, 'store']);
Route::put('transcations/{id}', [StudentBankTranscationController::class, 'update']);
Route::delete('transcations/{id}', [StudentBankTranscationController::class, 'destroy']);

Route::get('/students/find/{student_code}', [StudentController::class, 'findByCode']);
Route::apiResource('classrooms', ClassroomController::class);
Route::apiResource('student-banks', StudentBankController::class);