<?php

namespace App\Models\Note\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait NoteScopes
{
    /**
     * Scope to get public notes.
     */
    public function scopePublic(Builder $query): Builder
    {
        return $query->where('type', 'public');
    }

    /**
     * Scope to get non-draft notes.
     */
    public function scopeNotDraft(Builder $query): Builder
    {
        return $query->where('is_draft', false);
    }

    /**
     * Scope to search notes by title.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('title', 'like', "%{$search}%");
    }

    /**
     * Scope to order by newest first.
     */
    public function scopeOrderByNew(Builder $query): Builder
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope to order by oldest first.
     */
    public function scopeOrderByOld(Builder $query): Builder
    {
        return $query->orderBy('created_at', 'asc');
    }

    /**
     * Scope to order by most upvotes.
     */
    public function scopeOrderByMostUpvotes(Builder $query): Builder
    {
        return $query->withCount(['votes as upvotes' => function ($q) {
            $q->where('vote', 'up');
        }])->orderBy('upvotes', 'desc');
    }

    /**
     * Scope to order by most downvotes.
     */
    public function scopeOrderByDownvotes(Builder $query): Builder
    {
        return $query->withCount(['votes as downvotes' => function ($q) {
            $q->where('vote', 'down');
        }])->orderBy('downvotes', 'desc');
    }

    /**
     * Scope to get notes for a specific company.
     */
    public function scopeForCompany(Builder $query, int $companyId): Builder
    {
        return $query->whereHas('workspace', function (Builder $q) use ($companyId) {
            $q->where('company_id', $companyId);
        });
    }
}