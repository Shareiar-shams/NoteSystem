<?php

namespace App\Models\User\Scopes;

use Illuminate\Database\Eloquent\Builder;

trait UserScopes
{
    /**
     * Scope to get users by company.
     */
    public function scopeByCompany(Builder $query, int $companyId): Builder
    {
        return $query->where('company_id', $companyId);
    }
}