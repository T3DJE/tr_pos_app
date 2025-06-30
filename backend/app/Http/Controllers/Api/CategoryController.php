<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $query = Category::all();
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }

    public function createcategory(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'nama_category' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $category = Category::create(array_merge(
            $validator->validated()
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Supplier",
            "JSON" => $category
        ], 201);
    }

    public function showcategory(String $id)
    {
        $query = Category::find($id);
        return response()->json([
            "Status" => "Success",
            "Data" => $query
        ], 200);
    }


    public function updatecategory(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'nama_kategory' => 'required|string',
        ]);
        
        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $category = Category::findOrFail($request->id);

        $category -> update(
            $validator->validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update Category",
            "JSON" => $category
        ], 201);
    }

    public function destroycategory(String $id)
    {
        $idcategory = Category::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Data" => $idcategory
        ], 200);
    }
}
