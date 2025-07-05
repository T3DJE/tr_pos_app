<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;

class HistoryController extends Controller
{
    public function index()
    {
        $history = PurchaseHistory::with(['order.payment', 'order.items.produks', 'order.member'])->get();
        return response()->json([
            "Status" => "Success",
            "Data" => $history
        ], 200);
    }
}
