<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('students', StudentController::class);
Route::apiResource('classrooms', ClassroomController::class);