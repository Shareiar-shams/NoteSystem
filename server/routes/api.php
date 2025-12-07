<?php


use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::get('/test', function () {
        return ['message' => 'API working!'];
    });
});