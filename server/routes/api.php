<?php

use App\Http\Controllers\Note\NoteController;
use Illuminate\Support\Facades\Route;

// Include Auth routes
require __DIR__ . '/Auth/auth.php';

// protected routes
require __DIR__ . '/protectedRoute.php';

// public routes
require __DIR__ . '/publicRoute.php';