<?php


use Illuminate\Support\Facades\Route;

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    require __DIR__ . '/Workspace/workspace.php';
    require __DIR__ . '/Note/note.php';
});