<?php

namespace App\Services;
use App\Models\Category;
use App\User;

class CategoryService
{
    public function create($payload, $id) {
        $user = User::find($id);

        return $user->categories()->create($payload);
    }

    public function update($payload, $categoryId) {
        $category = Category::find($categoryId);
        $category->description = $payload["description"];
        
        return $category->save();
    }

    public function findById($id) {
        return Category::find($id);
    }

    public function destroy($id) {
        return Category::destroy($id);
    }
}
