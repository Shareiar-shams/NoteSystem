<?php

namespace App\Observers\Administration\NoteHistory;

use App\Models\NoteHistory\NoteHistory;

class NoteHistoryObserver
{
    /**
     * Handle the NoteHistory "created" event.
     */
    public function created(NoteHistory $noteHistory): void
    {
        //
    }

    /**
     * Handle the NoteHistory "updated" event.
     */
    public function updated(NoteHistory $noteHistory): void
    {
        //
    }

    /**
     * Handle the NoteHistory "deleted" event.
     */
    public function deleted(NoteHistory $noteHistory): void
    {
        //
    }

    /**
     * Handle the NoteHistory "restored" event.
     */
    public function restored(NoteHistory $noteHistory): void
    {
        //
    }

    /**
     * Handle the NoteHistory "force deleted" event.
     */
    public function forceDeleted(NoteHistory $noteHistory): void
    {
        //
    }
}
