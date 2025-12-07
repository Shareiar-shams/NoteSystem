<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validated = $request->validate([
            'name' => 'required', 'email' => 'required|unique:users', 'password' => 'required',
            'company_name' => 'required', // Create company if new
        ]);
        $company = Company::firstOrCreate([
            'name' => $validated['company_name'],
            'slug' => Str::slug($validated['company_name'])
        ]);
        $user = User::create([
            'name' => $validated['name'], 'email' => $validated['email'],
            'password' => Hash::make($validated['password']), 'company_id' => $company->id,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    public function login(Request $request) {
        $credentials = $request->validate(['email' => 'required', 'password' => 'required']);
        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token]);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
