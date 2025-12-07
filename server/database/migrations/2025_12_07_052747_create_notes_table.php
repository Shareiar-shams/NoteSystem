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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();
            $table->string('title')->index();
            $table->longText('content');
            $table->enum('type', ['public','private'])->index();
            $table->boolean('is_draft')->default(false)->index();
            $table->unsignedInteger('upvotes_count')->default(0)->index();
            $table->unsignedInteger('downvotes_count')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['workspace_id','status','type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
