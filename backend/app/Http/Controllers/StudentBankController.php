<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentBank\StoreStudentBankRequest;
use App\Http\Requests\StudentBank\UpdateStudentBankRequest;
use App\Http\Resources\StudentBankResource;
use App\Models\StudentBank;
use Illuminate\Http\Request;

class StudentBankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        Request $request,
    ) {
        $studentBanks = StudentBank::query()
            ->latest()
            ->paginate(
                perPage: $request->integer('per_page', 15)
            );
        return StudentBankResource::collection($studentBanks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreStudentBankRequest $request,
    ) {
        $studentBank = StudentBank::create($request->validated());
        return new StudentBankResource($studentBank);
    }

    /**
     * Display the specified resource.
     */
    public function show(
        string $id,
    ) {
        $student_bank = StudentBank::findOrFail($id);
        return new StudentBankResource($student_bank);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateStudentBankRequest $request,
        string $id,
    ) {
        $student_bank = StudentBank::findOfFail($id);
        $student_bank->update($request->validated());
        return new StudentBankResource($student_bank->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        string $id
    ) {
        $student_bank = StudentBank::findOrFail($id);
        $student_bank->delete();
        return response()->noContent();
    }
}
