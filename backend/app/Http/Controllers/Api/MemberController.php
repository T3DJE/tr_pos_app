<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\select;

class MemberController extends Controller
{
    public function index()
    {
        $query = Member::select('id','nama_member','no_telpon')->get();
        return response()->json([
            "Status" => "Succes",
            "Data" => $query
        ], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request -> all(),[
            'nama_member' => 'required|string',
            'no_telpon' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $member = Member::create(array_merge(
            $validator->validated()
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Add Member",
            "JSON" => $member
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $member = Member::find('id', $id)->select('id', 'nama_member', 'no_telpon')->get();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully GetId Member",
            "JSON" => $id
        ], 201);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $validator = Validator::make($request -> all(),[
            'nama_member' => 'required|string',
            'no_telpon' => 'required|string'
        ]);
        
        if($validator->fails()){
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $member = Member::findOrFail($request->id);

        $member -> update(
            $validator->validated()
        );

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Update Member",
            "JSON" => $member
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $member = Member::find($id)->delete();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Delete Member",
            "JSON" => $member
        ], 201);
    }
}
