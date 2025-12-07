<?php

namespace App\Models\NoteVote\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait NoteVoteScopes
{
    /**
     * Scope to get up votes.
     */
    public function scopeUp(Builder $query): Builder
    {
        return $query->where('vote', 'up');
    }

    /**
     * Scope to get down votes.
     */
    public function scopeDown(Builder $query): Builder
    {
        return $query->where('vote', 'down');
    }
}