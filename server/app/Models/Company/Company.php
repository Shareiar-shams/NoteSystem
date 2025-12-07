<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Company\Mutators\CompanyMutators;
use App\Models\Company\Accessors\CompanyAccessors;
use App\Models\Company\Relations\CompanyRelations;
use App\Models\Company\Scopes\CompanyScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Company\CompanyObserver;

#[ObservedBy([CompanyObserver::class])]
class Company extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use CompanyRelations;

    // Accessors & Mutators
    use CompanyAccessors, CompanyMutators;

    // Scopes
    use CompanyScopes;

    protected $casts = [];

    protected $fillable = [
        'name',
        'slug'
    ];
}