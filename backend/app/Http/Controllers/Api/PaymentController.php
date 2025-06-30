<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Payment::all();
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'nama_method' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $payment = Payment::create(array_merge(
            $validator->validated()
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Payment",
            "JSON" => $payment
        ], 201);
    }

    public function show(String $id)
    {
        $query = Payment::find($id);
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'nama_method' => 'required|string',
        ]);
        
        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $payment = Payment::findOrFail($request->id);

        $payment -> update(
            $validator->validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update Payment",
            "JSON" => $payment
        ], 201);
    }

    public function destroy(String $id)
    {
        $idpayment = Payment::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Data" => $idpayment
        ], 200);
    }
}
