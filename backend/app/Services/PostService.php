<?php

namespace App\Services;
use App\Models\Post;

class PostService
{
    public function findByCtgry($categoryId) {
        return Post::where('category_id', $categoryId)->get();
    }
}
