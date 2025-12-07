<?php

namespace App\Models\Workspace;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Workspace\Mutators\WorkspaceMutators;
use App\Models\Workspace\Accessors\WorkspaceAccessors;
use App\Models\Workspace\Relations\WorkspaceRelations;
use App\Models\Workspace\Scopes\WorkspaceScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Workspace\WorkspaceObserver;

#[ObservedBy([WorkspaceObserver::class])]
class Workspace extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use WorkspaceRelations;

    // Accessors & Mutators
    use WorkspaceAccessors, WorkspaceMutators;

    // Scopes
    use WorkspaceScopes;

    protected $casts = [];

    protected $fillable = [
        'company_id',
        'name',
        'description',
    ];
}