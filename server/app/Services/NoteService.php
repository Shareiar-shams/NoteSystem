<?php

namespace App\Services;

use App\Models\Note\Note;
use App\Models\NoteHistory\NoteHistory;
use App\Models\NoteVote\NoteVote;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class NoteService
{
    /**
     * Get public notes with optional search and sorting.
     */
    public function getPublicNotes(Request $request): LengthAwarePaginator
    {
        $query = Note::with(['workspace', 'tags'])->where('type', 'public')->where('is_draft', false);

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%$search%");
        }

        $sort = $request->query('sort', 'new');
        if ($sort === 'new') {
            $query->orderBy('created_at', 'desc');
        } elseif ($sort === 'old') {
            $query->orderBy('created_at', 'asc');
        } elseif ($sort === 'most_upvotes') {
            $query->withCount(['votes as upvotes' => function ($q) { $q->where('vote', 'up'); }])->orderBy('upvotes', 'desc');
        } elseif ($sort === 'downvotes') {
            $query->withCount(['votes as downvotes' => function ($q) { $q->where('vote', 'down'); }])->orderBy('downvotes', 'desc');
        }

        return $query->paginate(20);
    }

    /**
     * Get private notes for the user's company with optional search.
     */
    public function getPrivateNotes(Request $request, User $user): LengthAwarePaginator
    {
        $query = Note::with(['workspace', 'tags'])->whereHas('workspace', function (Builder $q) use ($user) {
            $q->where('company_id', $user->company_id);
        })->where('is_draft', false);

        if ($search = $request->query('search')) {
            $query->where('title', 'like', "%$search%");
        }

        return $query->paginate(20);
    }

    /**
     * Create a new note.
     */
    public function createNote(array $data, ?array $tags = null): Note
    {
        $note = Note::create($data);
        if ($tags) {
            $note->tags()->sync($tags);
        }
        return $note;
    }

    /**
     * Update an existing note.
     */
    public function updateNote(Note $note, array $data, ?array $tags = null): Note
    {
        $note->update($data);
        if ($tags !== null) {
            $note->tags()->sync($tags);
        }
        return $note;
    }

    /**
     * Delete a note.
     */
    public function deleteNote(Note $note): void
    {
        $note->delete();
    }

    /**
     * Get note history.
     */
    public function getNoteHistory(Note $note)
    {
        return $note->histories()->with('user')->orderBy('changed_at', 'desc')->get();
    }

    /**
     * Restore note from history.
     */
    public function restoreNoteHistory(Note $note, NoteHistory $history): Note
    {
        if ($history->note_id !== $note->id) {
            abort(403);
        }
        $note->update(['content' => $history->previous_content]);
        return $note;
    }

    /**
     * Vote on a note.
     */
    public function voteNote(Note $note, string $vote, User $user): void
    {
        NoteVote::updateOrCreate(
            ['note_id' => $note->id, 'user_id' => $user->id],
            ['vote' => $vote]
        );
    }
}