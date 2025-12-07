<?php

namespace App\Observers\Administration\NoteVote;

use App\Models\NoteVote\NoteVote;

class NoteVoteObserver
{
    /**
     * Handle the NoteVote "created" event.
     */
    public function created(NoteVote $noteVote): void
    {
        //
    }

    /**
     * Handle the NoteVote "updated" event.
     */
    public function updated(NoteVote $noteVote): void
    {
        //
    }

    /**
     * Handle the NoteVote "deleted" event.
     */
    public function deleted(NoteVote $noteVote): void
    {
        //
    }

    /**
     * Handle the NoteVote "restored" event.
     */
    public function restored(NoteVote $noteVote): void
    {
        //
    }

    /**
     * Handle the NoteVote "force deleted" event.
     */
    public function forceDeleted(NoteVote $noteVote): void
    {
        //
    }
}
