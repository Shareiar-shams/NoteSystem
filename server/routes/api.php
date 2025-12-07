<?php

use App\Http\Controllers\Note\NoteController;
use Illuminate\Support\Facades\Route;

// Include Auth routes
require __DIR__ . '/Auth/auth.php';

// protected routes
require __DIR__ . '/protectedRoute.php';


// public routes
Route::get('/notes/public', [NoteController::class, 'show']);