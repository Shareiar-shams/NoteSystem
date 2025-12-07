<?php

use App\Http\Controllers\Note\NoteController;
use Illuminate\Support\Facades\Route;

Route::get('/notes/public', [NoteController::class, 'show']);