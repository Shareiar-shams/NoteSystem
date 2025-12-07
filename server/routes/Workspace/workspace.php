<?php

use App\Http\Controllers\Workspace\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::controller(WorkspaceController::class)->prefix('/workspaces')->name('workspace.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
    Route::get('/{workspace}', 'show')->name('show');
    Route::put('/{workspace}', 'update')->name('update');
    Route::delete('/{workspace}', 'destroy')->name('destroy');
});