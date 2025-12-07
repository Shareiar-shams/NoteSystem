<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Http\Requests\Note\NoteRequest;
use App\Models\Note\Note;
use App\Models\NoteHistory\NoteHistory;
use App\Services\NoteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    protected $noteService;

    function __construct(NoteService $noteService)
    {
        $this->noteService = $noteService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){

    }

    /**
     * Display a listing of the private notes.
     */
    public function private(Request $request)
    {
        $user = Auth::user();
        return $this->noteService->getPrivateNotes($request, $user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(NoteRequest $request)
    {
        return $this->noteService->createNote($request->validated(), $request->tags);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $notes = $this->noteService->getPublicNotes($request);
        $user = Auth::user();

        if ($user) {
            $notes->getCollection()->transform(function ($note) use ($user) {
                $vote = $note->votes()->where('user_id', $user->id)->first();
                $note->user_vote = $vote ? $vote->vote : null;
                return $note;
            });
        }

        return $notes;
    }

    /**
     * Display a single note.
     */
    public function showNote(Note $note)
    {
        $this->authorizeNote($note);
        return $note->load(['tags', 'workspace']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Note $note, NoteRequest $request)
    {
        $this->authorizeNote($note);
        return $this->noteService->updateNote($note, $request->validated(), $request->tags);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorizeNote($note);
        $this->noteService->deleteNote($note);
        return response()->json(['message' => 'Deleted']);
    }

    public function history(Note $note) {
        $this->authorizeNote($note);
        return $this->noteService->getNoteHistory($note);
    }

    public function restoreHistory(Note $note, NoteHistory $history) {
        $this->authorizeNote($note);
        return $this->noteService->restoreNoteHistory($note, $history);
    }

    public function vote(Note $note, Request $request) {
        $validated = $request->validate(['vote' => 'required|in:up,down']);
        $user = Auth::user();
        $this->noteService->voteNote($note, $validated['vote'], $user);
        return response()->json(['message' => 'Voted']);
    }

    private function authorizeNote(Note $note) {
        $user = Auth::user();
        if (!$user) abort(401);
        if (!$note->workspace || $note->workspace->company_id !== $user->company_id) abort(403);
    }
}
