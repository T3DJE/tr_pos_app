<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 'index2']);
    }

    public function index()
    {
        $data = Test::select('id', 'kolom1')->get();
        return response()->json($data, 200, array(), JSON_PRETTY_PRINT);
    }

    public function index2()
    {
        $data = Test::select('id', 'kolom1')->get();
        return response()->json($data, 200, array(), JSON_PRETTY_PRINT);
    }
}
