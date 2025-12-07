<?php

namespace App\Models\Note;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Note\Mutators\NoteMutators;
use App\Models\Note\Accessors\NoteAccessors;
use App\Models\Note\Relations\NoteRelations;
use App\Models\Note\Scopes\NoteScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Note\NoteObserver;

#[ObservedBy([NoteObserver::class])]
class Note extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use NoteRelations;

    // Accessors & Mutators
    use NoteAccessors, NoteMutators;

    // Scopes
    use NoteScopes;

    protected $casts = [];

    protected $fillable = [
        'workspace_id',
        'title',
        'content',
        'type',
        'status'
    ];
}