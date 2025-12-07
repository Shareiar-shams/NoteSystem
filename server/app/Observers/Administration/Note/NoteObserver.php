<?php

namespace App\Observers\Administration\Note;

use App\Models\Note\Note;

class NoteObserver
{
    /**
     * Handle the Note "created" event.
     */
    public function created(Note $note): void
    {
        //
    }

    /**
     * Handle the Note "updated" event.
     */
    public function updated(Note $note): void
    {
        //
    }

    /**
     * Handle the Note "deleted" event.
     */
    public function deleted(Note $note): void
    {
        //
    }

    /**
     * Handle the Note "restored" event.
     */
    public function restored(Note $note): void
    {
        //
    }

    /**
     * Handle the Note "force deleted" event.
     */
    public function forceDeleted(Note $note): void
    {
        //
    }
}
