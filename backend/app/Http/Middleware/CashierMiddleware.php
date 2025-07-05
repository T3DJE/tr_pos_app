<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class CashierMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::guard('api')->user();
        Log::info('Role user:', ['role' => $user?->role]);

        if (!$user || $user->role !== 'cashier') {
            return response()->json([
                "Status" => "Failed",
                "Error" => "Forbidden dari cashier middleware"
            ], 403);
        }

        return $next($request);
    }
}

// try {
//         $user = JWTAuth::parseToken()->authenticate();
//         Log::info('User ditemukan:', ['id' => $user?->id, 'role' => $user?->role]);
//     } catch (\Exception $e) {
//         Log::error('Gagal authenticate JWT', ['error' => $e->getMessage()]);
//         return response()->json(["Status" => "Failed", "Error" => "Unauthorized"], 403);
//     }

//     if ($user->role !== 'cashier') {
//         return response()->json(["Status" => "Failed", "Error" => "Forbidden dari cashier middleware"], 403);
//     }
