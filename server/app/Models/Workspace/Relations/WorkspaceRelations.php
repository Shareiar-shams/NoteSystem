<?php

namespace App\Models\Workspace\Relations;

use App\Models\Company\Company;
use App\Models\Note\Note;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait WorkspaceRelations
{
    public function company() { 
        return $this->belongsTo(Company::class); 
    }
    public function notes(): HasMany { 
        return $this->hasMany(Note::class); 
    }
}