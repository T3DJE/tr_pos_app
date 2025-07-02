<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Pembayaran;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PembayaranController extends Controller
{
    public function indexpembayaran()
    {
        $query = Pembayaran::with(['order'])->get();
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }

    public function createbayar(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'pembayaran' => 'required|numeric|min:0',
            'order_id' => 'required|exists:orders,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()
            ], 400);
        }

        $validated = $validator->validated();
        $order = Order::find($validated["order_id"]);

        if (!$order) {
            return response()->json([
                "Status" => "Order not found"
            ], 404);
        }

        if ($validated['pembayaran'] < $order->total_harga) {
            return response()->json([
                "Status" => "Uang tidak cukup",
                "Total Harga" => $order->total_harga
            ], 422);
        }

        $kembalian = $validated['pembayaran'] - $order->total_harga;

        $pembayaran = Pembayaran::create([
            "pembayaran" => $validated["pembayaran"],
            "kembalian" => $kembalian,
            "order_id" => $validated["order_id"]
        ]);

         return response()->json([
            "message" => "Pembayaran berhasil",
            "pembayaran" => $pembayaran
        ], 201);
    }
}
