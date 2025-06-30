<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Produk;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $order = OrderItem::with(["produks"])->get();
        return response()->json([
            "Status" => "Succes",
            "Data" => $order
        ], 200);
    }

    public function createcart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "customer_name" => "required|string",
            "id_payment" => "required|exists:payments,id",
            "id_member" => "required|exists:members,id",
            "array" => "required|array",
            "array.*.id_product" => "required|exists:produks,id",
            "array.*.quantity" => "required|integer|min:1"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()
            ], 400);
        }

        $validated = $validator->validated();
        $totalHarga = 0;

        foreach ($validated["array"] as $item) {
            $product = Produk::find($item["id_product"]);
            $totalHarga += $product->harga_produk * $item["quantity"];
        }

        $order = Order::create([
            "customer_name" => $validated["customer_name"],
            "id_payment" => $validated["id_payment"],
            "id_member" => $validated["id_member"],
            "total_harga" => $totalHarga
        ]);

        $createdItems = [];

        foreach ($validated["array"] as $item) {
            $createdItems[] = OrderItem::create([
                "order_id" => $order->id,
                "id_product" => $item["id_product"],
                "quantity" => $item["quantity"]
            ]);
        }

        $order->load(['items.produks']);

        return response()->json([
            "message" => "Order created successfully",
            "order" => $order
        ], 201);
    }
}
