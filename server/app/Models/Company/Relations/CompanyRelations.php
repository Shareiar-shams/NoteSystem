<?php

namespace App\Models\Company\Relations;

use App\Models\User;
use App\Models\Workspace\Workspace;

trait CompanyRelations
{
    public function workspaces() { 
        return $this->hasMany(Workspace::class); 
    }
    public function users() { 
        return $this->hasMany(User::class); 
    }

}