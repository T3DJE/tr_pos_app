<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:api')->group(function () {
    Route::group(['middleware' => 'admin'], function () {

        // Cashier Routes
        Route::post('/registercashier', [AuthController::class, 'registercashier']);

        // Member Router
        Route::get('/readmember', [MemberController::class, 'index']);
        Route::get('/getbyid/{id}', [MemberController::class, 'show']);
        Route::post('/createmember', [MemberController::class, 'create']);
        Route::put('/updatemember', [MemberController::class, 'update']);
        Route::delete('/deletemember/{id}', [MemberController::class, 'destroy']);
        
        // Supplier Routes
        Route::get('/readsupplier', [SupplierController::class, 'readsupplier']);
        Route::post('/createsupplier', [SupplierController::class, 'createsupplier']);
        Route::get('/showsupplier/{id}', [SupplierController::class, 'showsupplier']);
        Route::put('/updatesupplier', [SupplierController::class, 'updatesupplier']);
        Route::delete('/destroysupplier/{id}', [SupplierController::class, 'destroysupplier']);

    });
});

