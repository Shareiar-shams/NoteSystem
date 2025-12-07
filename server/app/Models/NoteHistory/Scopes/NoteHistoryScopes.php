<?php

namespace App\Models\NoteHistory\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait NoteHistoryScopes
{
    /**
     * Scope to include user relation.
     */
    public function scopeWithUser(Builder $query): Builder
    {
        return $query->with('user');
    }

    /**
     * Scope to order by changed_at descending.
     */
    public function scopeOrderedByChangedAt(Builder $query): Builder
    {
        return $query->orderBy('changed_at', 'desc');
    }
}