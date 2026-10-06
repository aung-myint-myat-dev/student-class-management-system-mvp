<?php

namespace App\Http\Controllers;

use App\Http\Requests\Payment\StorePaymentRequest;
use App\Http\Requests\Payment\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\PaymentType;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payments = Payment::all();
        return PaymentResource::collection($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $payment = Payment::create($request->validated());
        return new PaymentResource($payment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $payment = Payment::findOrFail($request->id);
        return new PaymentResource($payment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request)
    {
        $data = $request->validated();
        $type = $data['type'];
        $payment = Payment::findOrFail($request->id);
        $payment->update([
            'type' => $type,
            'account_name' => $data['account_name'],
            'account_number' => $type === PaymentType::BANKING->value ? $data['account_number'] : null,
            'phone_number' => $type === PaymentType::MOBILE->value ? $data['phone_number'] : null,
        ]);
        return new PaymentResource($payment->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $payment = Payment::findOrFail($request->id);
        return $payment->delete();
    }

    /**
     * Toggle the is active column
     */
    public function toggleIsActive(Request $request)
    {
        $payment = Payment::findOrFail($request->id);

        return $payment->update([
            'is_active' => !$payment->is_active,
        ]);
    }
}
