<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomResource;
use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request,
    ) {
        $classrooms = Classroom::query()
            ->withCount('students')
            ->latest()
            ->paginate(
                perPage: $request->integer('per_page', 10)
            );

        return ClassroomResource::collection($classrooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreClassroomRequest $request,
    ) {
        $classroom = Classroom::create($request->validated());

        return new ClassroomResource($classroom->load('students'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        return new ClassroomResource($classroom->load('students'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateClassroomRequest $request,
        Classroom $classroom,
    ) {
        $classroom->update($request->validated());

        return new ClassroomResource($classroom->refresh()->load('students'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        if ($classroom->students()->exists()) {
            return response()->json([
                'message' => 'Students register this class. Cannot delete.',
            ], 409);
        }
        $classroom->delete();

        return response()->noContent();
    }
}
