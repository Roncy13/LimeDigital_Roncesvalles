<?php

namespace App\Policies;

use App\User;
use App\Models\Post;
use App\Models\Category;
use App\Services\PostService;
use App\Services\CategoryService;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;
    private $categoryService, $postService;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(
        CategoryService $categoryService, 
        PostService $postService
    )
    {
        $this->categoryService = $categoryService;
        $this->postService = $postService;
        //
    }
  
    private function isCtgryOwndByUsr($user, $categoryId) {
        $record = $this->categoryService->findById($categoryId);
        return $record->user_id === $user->id;
    }

    /**
     * Determine if the given post can be updated by the user.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return \Illuminate\Auth\Access\Response
     */

    public function update(User $user, Category $category)
    {
        return $this->isCtgryOwndByUsr($user, $category->id);
    }

    public function destroy(User $user, Category $category)
    {
        $owned = $this->isCtgryOwndByUsr($user, $category->id);

        if (!$owned) {
            return false;
        }

        $hasPost = $this->postService->findByCtgry($category->id);

        // Checks if Category is being used
        if (count($hasPost) > 0) {
            return $this->deny("Category has been used, cannot be deleted...!");
        }

        return true;
    }
}
