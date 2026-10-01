<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentBankTranscation\StoreRequest;
use App\Models\StudentBankTranscation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentBankTranscationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreRequest $request
    ) {
        return DB::transaction(function () use ($request) {
            $transcation = StudentBankTranscation::create([
                'student_bank_id' => $request->student_bank_id,
                'transcation_type' => $request->transcation_type,
                'date' => $request->date,
                'amount' => $request->amount,
                'description' => $request->description,
                'payment_method' => $request->payment_method,
            ]);

            $changedAmount = $transcation->amount;

            if ($transcation->transcation_type === 'cash_in') {
                $transcation->bank()->increment('balance', $changedAmount);
            } else {
                $transcation->bank()->decrement('balance', $changedAmount);
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('student-transcations', 'public');

                    $transcation->images()->create([
                        'image_url' => $path,
                    ]);
                }
            }

            return $transcation->refresh();
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
