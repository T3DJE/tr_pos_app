<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/index2', [TestController::class, 'index2']);
    });

    Route::group(['middleware' => 'admin'], function () {
        Route::get('/index', [TestController::class, 'index']);
    });
});
