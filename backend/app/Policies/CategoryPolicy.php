<?php

namespace App\Policies;

use App\User;
use App\Models\Category;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function update(User $user, Category $category)
    {
        $record = Category::find($category->id);
        return $record->user_id === $user->id;
    }
}
