<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use App\Http\Requests\Workspace\WorkspaceRequest;
use App\Models\Workspace\Workspace;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WorkspaceController extends Controller
{
    protected $workspaceService;

    public function __construct(WorkspaceService $workspaceService)
    {
        $this->workspaceService = $workspaceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $user = Auth::user();
        return $this->workspaceService->getWorkspaces($request, $user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkspaceRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated() + ['company_id' => $user->company_id];
        return $this->workspaceService->createWorkspace($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        $user = Auth::user();
        if (!$this->workspaceService->authorizeWorkspace($workspace, $user)) {
            abort(403);
        }
        return $this->workspaceService->getWorkspace($workspace);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkspaceRequest $request, Workspace $workspace)
    {
        $user = Auth::user();
        if (!$this->workspaceService->authorizeWorkspace($workspace, $user)) {
            abort(403);
        }
        return $this->workspaceService->updateWorkspace($workspace, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace)
    {
        $user = Auth::user();
        if (!$this->workspaceService->authorizeWorkspace($workspace, $user)) {
            abort(403);
        }
        $this->workspaceService->deleteWorkspace($workspace);
        return response()->json(['message' => 'Deleted']);
    }
}
