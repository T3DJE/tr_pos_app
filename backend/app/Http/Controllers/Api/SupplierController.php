<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{

    public function readsupplier()
    {
        $query = Supplier::all();
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }

    public function createsupplier(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_supplier' => 'required|string',
            'alamat_supplier' => 'required|string',
            'nama_produk' => 'required|string|unique:suppliers,nama_produk',
            'stok_produk' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $supplier = Supplier::create(array_merge(
            $validator->validated()
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Supplier",
            "JSON" => $supplier
        ], 201);
    }

    public function showsupplier(String $id)
    {
        $query = Supplier::find($id);
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }


    public function updatesupplier(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_supplier' => 'required|string',
            'alamat_supplier' => 'required|string',
            'nama_produk' => 'required|string',
            'stok_produk' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $supplier = Supplier::findOrFail($request->id);

        $supplier->update(
            $validator->validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update Supplier",
            "JSON" => $supplier
        ], 201);
    }

    public function destroysupplier(String $id)
    {
        $idsupplier = Supplier::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Data" => $idsupplier
        ], 200);
    }
}
