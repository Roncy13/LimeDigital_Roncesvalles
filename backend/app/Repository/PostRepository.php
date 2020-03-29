<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Model;
use App\Post;
use Illuminate\Support\Facades\Auth; 
use App\User;

class PostRepository extends Model
{
    public function create($payload, $user) {
        $id = $user->id;
        $post = User::find($id)->post()->create($payload);

        return $post;
    }
}
