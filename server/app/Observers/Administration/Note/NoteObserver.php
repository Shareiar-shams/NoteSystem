<?php

namespace App\Observers\Administration\Note;

use App\Models\Note\Note;
use App\Models\NoteHistory\NoteHistory;
use Illuminate\Support\Facades\Auth;

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
        if ($note->isDirty('content')) {
            NoteHistory::create([
                'note_id' => $note->id,
                'previous_content' => $note->getOriginal('content'),
                'user_id' => Auth::id(),
                'changed_at' => now(),
            ]);
        }
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
