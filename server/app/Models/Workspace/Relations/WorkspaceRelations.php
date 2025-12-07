<?php

namespace App\Models\Workspace\Relations;

use App\Models\Company\Company;
use App\Models\Note\Note;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait WorkspaceRelations
{
    /**
     * Get the company that owns the workspace.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the notes for the workspace.
     */
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}