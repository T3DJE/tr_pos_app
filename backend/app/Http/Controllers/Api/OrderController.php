<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Produk;
use App\Models\PurchaseHistory;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\XenditService;

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
            "pembayaran" => "nullable|numeric|min:0",
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
            //perubahan
            $product = Produk::with('supplier')->find($item["id_product"]);

            if (!$product) {
                return response()->json([
                    "Status" => "Failed",
                    "Error" => "Produk tidak ditemukan"
                ], 404);
            }

            if ($product->supplier->stok_produk < $item["quantity"]) {
                return response()->json([
                    "Status" => "Failed",
                    "Error" => "Stok tidak mencukupi untuk produk: " . $product->supplier->nama_produk
                ], 400);
            }

            $product->supplier->stok_produk -= $item["quantity"];
            $product->supplier->save();

            $totalHarga += $product->harga_produk * $item["quantity"];
        }

        if (!empty($validated["id_member"])) {
            $member = Member::find($validated["id_member"]);
            if ($member) {
                $totalHarga -= $totalHarga * 5 / 100;
            }
        }

        $pembayaran = $validated["pembayaran"] ?? null;
        $payment_link = null;
        $kembalian = 0;

        if ($validated["id_payment"] == 1) {
            if ($pembayaran === null || $pembayaran < $totalHarga) {
                return response()->json([
                    "Status" => "Failed",
                    "Message" => "Pembayaran tidak cukup"
                ], 400);
            }
            $kembalian = $pembayaran - $totalHarga;
        }
        $order = Order::create([
            "customer_name" => $validated["customer_name"],
            "id_payment" => $validated["id_payment"],
            "id_member" => $validated["id_member"] ?? null,
            "total_harga" => $totalHarga,
            "pembayaran" => $pembayaran,
            "payment_link" => null
        ]);

        if ($validated["id_payment"] == 2) {
            $xendit = new XenditService();
            $payment_link = $xendit->createInvoice($order);
            $order->update(['payment_link' => $payment_link]);
        }

        $createdItems = [];

        foreach ($validated["array"] as $item) {
            $createdItems[] = OrderItem::create([
                "order_id" => $order->id,
                "id_product" => $item["id_product"],
                "quantity" => $item["quantity"]
            ]);
        }

        PurchaseHistory::create([
            'order_id' => $order->id,
            'status' => "Success",
            "kembalian" => $kembalian ?? null
        ]);

        $order->load(['items.produks']);

        return response()->json([
            "message" => "Order created successfully",
            "order" => $order,
            "payment_link" => $payment_link,
        ], 201);
    }
}
