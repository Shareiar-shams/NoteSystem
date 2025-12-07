<?php

namespace App\Models\NoteVote;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\NoteVote\Mutators\NoteVoteMutators;
use App\Models\NoteVote\Accessors\NoteVoteAccessors;
use App\Models\NoteVote\Relations\NoteVoteRelations;
use App\Models\NoteVote\Scopes\NoteVoteScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\NoteVote\NoteVoteObserver;

#[ObservedBy([NoteVoteObserver::class])]
class NoteVote extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use NoteVoteRelations;

    // Accessors & Mutators
    use NoteVoteAccessors, NoteVoteMutators;

    // Scopes
    use NoteVoteScopes;

    protected $casts = [];

    protected $fillable = [
        'note_id',
        'user_id',
        'vote',
    ];
}