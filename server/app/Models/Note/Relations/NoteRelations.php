<?php

namespace App\Models\Note\Relations;

use App\Models\NoteHistory\NoteHistory;
use App\Models\NoteVote\NoteVote;
use App\Models\Tag\Tag;
use App\Models\Workspace\Workspace;

trait NoteRelations
{
    public function workspace() { 
        return $this->belongsTo(Workspace::class); 
    }
    public function tags() { 
        return $this->belongsToMany(Tag::class); 
    }
    public function histories() { 
        return $this->hasMany(NoteHistory::class); 
    }
    public function votes() { 
        return $this->hasMany(NoteVote::class); 
    }
}