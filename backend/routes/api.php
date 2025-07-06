<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\POSController;
use App\Http\Controllers\Api\ProdukController;
use App\Http\Controllers\Api\SupplierController;
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
        Route::get('/getbyidmember/{id}', [MemberController::class, 'show']);
        Route::post('/createmember', [MemberController::class, 'create']);
        Route::put('/updatemember', [MemberController::class, 'update']);
        Route::delete('/deletemember/{id}', [MemberController::class, 'destroy']);

        // Supplier Routes
        Route::get('/readsupplier', [SupplierController::class, 'readsupplier']);
        Route::post('/createsupplier', [SupplierController::class, 'createsupplier']);
        Route::get('/showsupplier/{id}', [SupplierController::class, 'showsupplier']);
        Route::put('/updatesupplier', [SupplierController::class, 'updatesupplier']);
        Route::delete('/destroysupplier/{id}', [SupplierController::class, 'destroysupplier']);

        // Category Routes
        Route::get('/readcategory', [CategoryController::class, 'index']);
        Route::post('/createcategory', [CategoryController::class, 'createcategory']);
        Route::get('/showcategory/{id}', [CategoryController::class, 'showcategory']);
        Route::put('/updatecategory', [CategoryController::class, 'updatecategory']);
        Route::delete('/destroycategory/{id}', [CategoryController::class, 'destroycategory']);

        // Produk Routes
        Route::get('/readproduk', [ProdukController::class, 'index']);
        Route::post('/createproduk', [ProdukController::class, 'createproduk']);
        Route::get('/showproduk/{id}', [ProdukController::class, 'getbyidproduk']);
        Route::get('/getbycategoryproduk/{id}', [ProdukController::class, 'getbycategoryproduk']);
        Route::put('/updateproduk', [ProdukController::class, 'updateproduk']);
        Route::delete('/destroyproduk/{id}', [ProdukController::class, 'destroyproduk']);

        // Payment Routes
        Route::get('/readpayment', [PaymentController::class, 'indexpayment']);
        Route::post('/createpayment', [PaymentController::class, 'createpayment']);
        Route::get('/getbyidpayment/{id}', [PaymentController::class, 'getbyidpayment']);
        Route::put('/updatepayment', [PaymentController::class, 'updatepayment']);
        Route::delete('/destroypayment/{id}', [PaymentController::class, 'destroypayment']);

        // History Routes
        Route::get('/readhistory', [HistoryController::class, 'index']);
        Route::get('/readcashieracc', [AuthController::class, 'index']);
    });

    Route::group(['middleware' => 'cashier'], function () {
        Route::get('/readcashierproduk', [POSController::class, 'index']);
        Route::get('/readcart', [OrderController::class, 'index']);
        Route::post('/createcart', [OrderController::class, 'createcart']);
        Route::get('/readcashierpayment', [PaymentController::class, 'indexpayment']);
        Route::get('/readcashiermember', [MemberController::class, 'index']);
        Route::get('/readcashiercategory', [CategoryController::class, 'index']);
        Route::get('/getbycashiercategoryproduk/{id}', [ProdukController::class, 'getbycategoryproduk']);
        Route::get('/readcashiersupplier', [SupplierController::class, 'readsupplier']);
        Route::post('/searchproduk', [ProdukController::class, 'search']);
    });
});
