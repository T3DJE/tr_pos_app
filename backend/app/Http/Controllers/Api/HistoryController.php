<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;

class HistoryController extends Controller
{
    public function index()
    {
        $history = PurchaseHistory::with(['order.pembayaran'])->get();
        return response()->json([
            "Status" => "Succes",
            "Data" => $history
        ], 200);
    }
}
