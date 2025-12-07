<?php

namespace App\Models\Tag\Relations;

use App\Models\Note\Note;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait TagRelations
{
    public function notes(): BelongsToMany { 
        return $this->belongsToMany(Note::class); 
    }
}