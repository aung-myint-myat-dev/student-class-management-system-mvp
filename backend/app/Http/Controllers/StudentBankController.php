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
            ->when($request->filled('student_code'), function ($query) use ($request) {
                $code = $request->student_code;

                $query->where('student_code', $code);
            })
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
        $data = $request->validated();
        // $paymentMethod = $data['payment_method'];
        // $openingAmountType = $data['opening_amount_type'] === 'credit' ? 'cash_out' : 'cash_in';
        unset($data['opening_amount_type'], $data['payment_method']);
        $studentBank = StudentBank::create($data);

        return new StudentBankResource($studentBank);
    }

    /**
     * Display the specified resource.
     */
    public function show(
        string $id,
    ) {
        $student_bank = StudentBank::with(['transcations.images', 'transcations.bank:id,balance'])->findOrFail($id);

        return new StudentBankResource($student_bank);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateStudentBankRequest $request,
    ) {
        $bank = StudentBank::findOrFail($request->student_bank);
        $data = $request->validated();
        // $paymentMethod = $data['payment_method'];
        // $openingAmountType = $data['opening_amount_type'] === 'credit' ? 'cash_out' : 'cash_in';
        unset($data['opening_amount_type'], $data['payment_method']);

        $bank->update($data);
        return new StudentBankResource($bank->refresh());
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
