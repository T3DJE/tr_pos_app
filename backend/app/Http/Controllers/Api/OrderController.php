<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
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
            "array" => "required|array",
            "array.*.id_product" => "required|exists:produks,id",
            "array.*.quantity" => "required|integer"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $validated = $validator->validated();
        $createdItems = [];

        foreach ($validated['array'] as $item) {
            $createdItems[] = OrderItem::create([
                'id_product' => $item['id_product'],
                'quantity' => $item['quantity']
            ]);
        }

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully created an order",
            "JSON" => $createdItems
        ], 201);
    }
}
