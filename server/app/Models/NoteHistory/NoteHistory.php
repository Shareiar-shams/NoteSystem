<?php

namespace App\Models\NoteHistory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\NoteHistory\Mutators\NoteHistoryMutators;
use App\Models\NoteHistory\Accessors\NoteHistoryAccessors;
use App\Models\NoteHistory\Relations\NoteHistoryRelations;
use App\Models\NoteHistory\Scopes\NoteHistoryScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\NoteHistory\NoteHistoryObserver;

#[ObservedBy([NoteHistoryObserver::class])]
class NoteHistory extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use NoteHistoryRelations;

    // Accessors & Mutators
    use NoteHistoryAccessors, NoteHistoryMutators;

    // Scopes
    use NoteHistoryScopes;

    protected $casts = [];

    protected $fillable = [
        'note_id',
        'user_id',
        'previous_title',
        'previous_content',
    ];

    public $timestamps = false;
}