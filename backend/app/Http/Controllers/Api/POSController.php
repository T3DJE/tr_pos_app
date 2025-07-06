<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class POSController extends Controller
{

    public function index()
    {
        $produk = Produk::with(['supplier', 'category'])->whereHas('supplier', function($q) {$q->where('stok_produk',">",0);})->orderBy("id", "asc")->get();
        return response()->json([
            "Status" => "Succes",
            "Data" => $produk
        ], 200);
    }
}
