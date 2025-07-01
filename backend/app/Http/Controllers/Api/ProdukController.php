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
        $produk = Produk::with(['supplier', 'category'])->get();
        return response()->json([
            "Status" => "Succes",
            "Data" => $produk
        ], 200);
    }

    public function createproduk(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'harga_produk' => 'required|numeric',
            'id_category' => 'required|exists:categories,id',
            'id_supplier' => 'required|exists:suppliers,id',
            'image' => 'nullable|mimes:jpg,jpeg,png|max:2048'
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
            $validator -> validated(), ['image' => $path]
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Produk",
            "JSON" => $produk
        ], 201);
    }

    public function getbyidproduk(String $id)
    {
        $produk = Produk::find($id) -> get();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Get ID: $id Produk",
            "JSON" => $produk
        ], 201);
    }

    public function getbycategoryproduk(String $category){
        $produk = Produk::where('id_category', $category) -> get();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Get ID: $category Produk",
            "JSON" => $produk
        ], 201);
    }

    public function updateproduk(Request $request)
    {
        $validator = Validator::make($request -> all(),[
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

    public function destroyproduk(String $id)
    {
        $produk = Produk::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Delete Member",
            "JSON" => $produk
        ], 201);

    }
}
