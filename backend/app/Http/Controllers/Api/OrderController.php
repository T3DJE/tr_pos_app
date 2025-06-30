<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::select(
            'id',
            'nama_produk',
            'harga_produk',
            'jumlah_produk',
            'discount',
            'total_harga',
            'payment_method')->get();
        
        return response()->json([
            "Status" => "Succes",
            "Data" => $order
        ], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nama_produk' => 'required|string',
            'harga_produk' => 'required|numeric',
            'jumlah_produk' => 'required|integer',
            'discount' => 'required|numeric',
            'total_harga' => 'required|numeric',
            'payment_method' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $order = Order::create(array_merge(
            $validator -> validated()
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Make An Order",
            "JSON" => $order
        ], 201);
    }

    public function getbyid(String $id)
    {
        $order = Order::select(
            'id',
            'nama_produk',
            'harga_produk',
            'jumlah_produk',
            'discount',
            'total_harga',
            'payment_method')->find($id);
            
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Get ID: $id Order",
            "JSON" => $order
        ], 201);
        
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nama_produk' => 'required|string',
            'harga_produk' => 'required|numeric',
            'jumlah_produk' => 'required|integer',
            'discount' => 'required|numeric',
            'total_harga' => 'required|numeric',
            'payment_method' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $order = Order::update(
            $validator -> validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update an Order",
            "JSON" => $order
        ], 201);
    }

    public function destroy(String $id)
    {
        $order = Order::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Delete Member",
            "JSON" => $order
        ], 201);
    }
}
