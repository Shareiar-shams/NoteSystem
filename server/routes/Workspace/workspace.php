<?php

use App\Http\Controllers\Workspace\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::controller(WorkspaceController::class)->prefix('/workspace')->name('workspace.')->group(function () {
    Route::get('/', 'index')->name('index');
});