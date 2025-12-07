<?php

use App\Http\Controllers\Note\NoteController;
use Illuminate\Support\Facades\Route;

Route::controller(NoteController::class)->prefix('/notes')->group(function () {
    Route::get('/', 'index');
    Route::get('/public', 'show');
    Route::get('/private', 'private');
    Route::post('/create', 'create');
    Route::get('/{note}', 'showNote');
    Route::put('/{note}', 'update');
    Route::delete('/{note}', 'destroy');
    Route::get('/{note}/history', 'history');
    Route::post('/{note}/restore/{history}', 'restoreHistory');
    Route::post('/{note}/vote', 'vote');
});