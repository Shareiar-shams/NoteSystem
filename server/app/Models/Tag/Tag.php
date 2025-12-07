<?php

namespace App\Models\Tag;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Tag\Mutators\TagMutators;
use App\Models\Tag\Accessors\TagAccessors;
use App\Models\Tag\Relations\TagRelations;
use App\Models\Tag\Scopes\TagScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\Administration\Tag\TagObserver;

#[ObservedBy([TagObserver::class])]
class Tag extends Model
{
    use HasFactory, SoftDeletes;

    // Relations
    use TagRelations;

    // Accessors & Mutators
    use TagAccessors, TagMutators;

    // Scopes
    use TagScopes;

    protected $casts = [];

    protected $fillable = [
        'name',
        'slug'
    ];
}