<?php

namespace App\Models\NoteVote\Relations;

use App\Models\Note\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait NoteVoteRelations
{
    public function note(): BelongsTo { 
        return $this->belongsTo(Note::class); 
    }
    public function user(): BelongsTo { 
        return $this->belongsTo(User::class); 
    }
}