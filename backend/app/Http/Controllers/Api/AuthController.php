<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::user()
        ]);
    }

    public function register(Request  $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2, 100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:8|regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role' => 'admin'
            ]
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Registered",
            "JSON" => $user
        ], 201);
    }


    public function registercashier(Request  $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2, 100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:8|regex:/^(?=.*[A-Z])(?=.*[\W_]).+$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role' => 'cashier'
            ]
        ));

        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Registered",
            "JSON" => $user
        ], 201);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Status" => "Failed",
                "Error" => "Email or password is incorrect."
            ], 400);
        }

        $token = JWTAuth::attempt($validator->validated());

        if (!$token) {
            return response()->json([
                "Status" => "Failed",
                "Error" => $validator->errors()->toJson()
            ], 401);
        }
        return $this->createNewToken($token);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            "Status" => "Success",
            "Response" => "Successfully Logout"
        ], 200);
    }

    public function index(){
        $cashiers = User::where('role', 'cashier')->get();
        return response()->json([
            'Status' => 'Success',
            'Data' => $cashiers
        ], 200);
    }
}
