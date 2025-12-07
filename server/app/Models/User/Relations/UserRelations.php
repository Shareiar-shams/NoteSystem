<?php

namespace App\Models\User\Relations;

use App\Models\Company\Company;
use App\Models\NoteHistory\NoteHistory;
use App\Models\NoteVote\NoteVote;

trait UserRelations
{
    public function company() { 
        return $this->belongsTo(Company::class); 
    }
    public function noteHistories() { 
        return $this->hasMany(NoteHistory::class); 
    }
    public function votes() { 
        return $this->hasMany(NoteVote::class); 
    }
}