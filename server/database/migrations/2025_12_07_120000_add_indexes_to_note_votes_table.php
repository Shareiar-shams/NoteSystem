<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('note_votes', function (Blueprint $table) {
            $table->index('user_id');
            $table->index(['note_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('note_votes', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['note_id', 'user_id']);
        });
    }
};
