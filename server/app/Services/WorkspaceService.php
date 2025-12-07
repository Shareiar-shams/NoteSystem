<?php

namespace App\Services;

use App\Models\User;
use App\Models\Workspace\Workspace;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class WorkspaceService
{
    /**
     * Get workspaces for the user's company with optional search.
     */
    public function getWorkspaces(Request $request, User $user): LengthAwarePaginator
    {
        $query = Workspace::forCompany($user->company_id);

        if ($search = $request->query('search')) {
            $query->search($search);
        }

        return $query->paginate(20);
    }

    /**
     * Create a new workspace.
     */
    public function createWorkspace(array $data): Workspace
    {
        return Workspace::create($data);
    }

    /**
     * Get a specific workspace.
     */
    public function getWorkspace(Workspace $workspace): Workspace
    {
        return $workspace->load('company');
    }

    /**
     * Update a workspace.
     */
    public function updateWorkspace(Workspace $workspace, array $data): Workspace
    {
        $workspace->update($data);
        return $workspace;
    }

    /**
     * Delete a workspace.
     */
    public function deleteWorkspace(Workspace $workspace): void
    {
        $workspace->delete();
    }

    /**
     * Authorize workspace access for user.
     */
    public function authorizeWorkspace(Workspace $workspace, User $user): bool
    {
        return $workspace->company_id === $user->company_id;
    }
}