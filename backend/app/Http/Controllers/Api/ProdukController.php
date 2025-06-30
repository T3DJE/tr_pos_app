<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProdukController extends Controller
{
    public function index()
    {
        $produk = Produk::select(
            'id',
            'kode_produk',
            'nama_produk', 
            'stok_produk', 
            'harga_produk', 
            'category_produk', 
            'gambar_produk')->get();
        
        return response()->json([
            "Status" => "Succes",
            "Data" => $produk
        ], 200);
    }

    public function create(Request $request)
    {
        
        $validator = Validator::make($request -> all(),[
            'kode_produk' => 'required|string',
            'nama_produk' => 'required|string',
            'stok_produk' => 'required|integer',
            'harga_produk' => 'required|numeric',
            'category_produk' => 'required|string',
            'gambar_produk' => 'nullable|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }
        
        $path = null;
        
        if($request->hasFile('image')){
            $image = $request->file('image');
            $path = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $path);
        }

        $produk = Produk::create(array_merge(
            $validator -> validated(),
            ['gambar_produk' => $path]
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Produk",
            "JSON" => $produk
        ], 201);
    }

    public function getbyid(String $id)
    {
        $produk = Produk::select(
            'id',
            'kode_produk',
            'nama_produk', 
            'stok_produk', 
            'harga_produk', 
            'category_produk', 
            'gambar_produk')->find($id);
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Get ID: $id Produk",
            "JSON" => $produk
        ], 201);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'kode_produk' => 'required|string',
            'nama_produk' => 'required|string',
            'stok_produk' => 'required|integer',
            'harga_produk' => 'required|numeric',
            'category_produk' => 'required|string',
            'gambar_produk' => 'nullable|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $produk = Produk::find($request->id);

        $produk -> update(
            $validator->validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update Produk",
            "JSON" => $produk
        ], 201);

    }

    public function destroy(String $id)
    {
        $produk = Produk::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Delete Member",
            "JSON" => $produk
        ], 201);
        
    }
}
