<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request,
    ) {
        $students = Student::query()
            ->with(['classroom:id,name'])
            ->latest()
            ->paginate(
                perPage: $request->integer('per_page', 10),
            );
        return StudentResource::collection($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreStudentRequest $request
    ) {
        $student = Student::create($request->validated());
        return new StudentResource($student->load('classroom'));
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Student $student
    ) {
        return new StudentResource($student->load('classroom'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateStudentRequest $request,
        Student $student
    ) {
        $student->update($request->validated());
        return new StudentResource($student->refresh()->load('classroom'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return response()->noContent();
    }
}
