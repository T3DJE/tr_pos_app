<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Pembayaran;
use App\Models\Produk;
use App\Models\PurchaseHistory;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function transaksi()
    {
        $order = OrderItem::with(["produks"])->get();
        return response()->json([
            "Status" => "Success",
            "Data" => $order
        ], 200);
    }

    public function createcart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "customer_name" => "required|string",
            "id_payment" => "required|exists:payments,id",
            "id_member" => "nullable|exists:members,id",
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
        $stoksisa = 0;

        foreach ($validated["array"] as $item) {
            $product = Produk::find($item["id_product"]);
            $totalHarga += $product->harga_produk * $item["quantity"];

            $stokproduk = Supplier::find($item["id_product"]);
            if ($stokproduk->stok_produk <= $item["quantity"]) {
                return response()->json([
                    "Error" => "Stok Tidak Mencukupi"
                ], 200);
            }
            $stoksisa = $stokproduk->stok_produk - $item["quantity"];
            $stokproduk->stok_produk = $stoksisa;
            $stokproduk->save();
        }

        if (!empty($validated["id_member"])) {
            $member = Member::find($validated["id_member"]);
            if ($member) {
                $totalHarga -= $totalHarga * 5 / 100;
            }
        }

        $order = Order::create([
            "customer_name" => $validated["customer_name"],
            "id_payment" => $validated["id_payment"],
            "id_member" => $validated["id_member"] ?? null,
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

        PurchaseHistory::create([
            'order_id' => $order->id,
            'status' => "Success"
        ]);

        return response()->json([
            "message" => "Order created successfully",
            "order" => $order
        ], 201);
    }
}
