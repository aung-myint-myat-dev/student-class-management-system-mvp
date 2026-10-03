<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentBankTranscation\StoreRequest;
use App\Models\StudentBank;
use App\Models\StudentBankTranscation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
    public function store(StoreRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $bank = StudentBank::where('id', $request->student_bank_id)->firstOrFail();
            $data = $request->validated();

            $amount = $data['amount'];
            $isCashIn = $data['transcation_type'] === 'cash_in';

            $calculatedRemainingBalance = $isCashIn
                ? $bank->balance + $amount
                : $bank->balance - $amount;

            $transaction = StudentBankTranscation::create([
                'student_bank_id' => $bank->id,
                'transcation_type' => $data['transcation_type'],
                'date' => $data['date'],
                'amount' => $amount,
                'description' => $data['description'],
                'payment_method' => $data['payment_method'],
                'remaing_balance' => $calculatedRemainingBalance,
            ]);

            if ($isCashIn) {
                $bank->increment('balance', $amount);
            } else {
                $bank->decrement('balance', $amount);
            }

            if ($request->hasFile('images')) {
                $imageData = [];
                foreach ($request->file('images') as $image) {
                    $imageData[] = [
                        'image_url' => $image->store('student-transcations', 'public'),
                    ];
                }
                $transaction->images()->createMany($imageData);
            }

            return $transaction->load(['bank', 'images']);
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
    public function update(Request $request, $id)
    {
        // 1. Validation
        $request->validate([
            'student_bank_id' => 'required|exists:student_banks,id',
            'date' => 'required|date',
            'transcation_type' => 'required|in:cash_in,cash_out',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'payment_method' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'existing_image_ids' => 'nullable|array',
            'existing_image_ids.*' => 'integer',
        ]);

        return DB::transaction(function () use ($request, $id) {
            $transaction = StudentBankTranscation::findOrFail($id);

            $transaction->update([
                'student_bank_id' => $request->student_bank_id,
                'date' => $request->date,
                'transcation_type' => $request->transcation_type,
                'amount' => $request->amount,
                'description' => $request->description,
                'payment_method' => $request->payment_method,
            ]);

            $keptImageIds = $request->input('existing_image_ids', []);

            $imagesToDelete = $transaction->images()
                ->whereNotIn('id', $keptImageIds)
                ->get();

            foreach ($imagesToDelete as $image) {
                if (Storage::disk('public')->exists($image->image_url)) {
                    Storage::disk('public')->delete($image->image_url);
                }
                $image->delete();
            }

            if ($request->hasFile('images')) {
                $newImages = [];
                foreach ($request->file('images') as $file) {
                    $path = $file->store('student-transcations', 'public');
                    $newImages[] = [
                        'image_url' => $path,
                    ];
                }
                $transaction->images()->createMany($newImages);
            }

            return response()->json([
                'message' => 'Transaction updated successfully!',
                'data' => $transaction->load(['bank', 'images']),
            ], 200);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $transcation = StudentBankTranscation::findOrFail($request->id);

        return $transcation->delete();
    }
}
