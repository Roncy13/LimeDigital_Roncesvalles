<?php

namespace App\Services;

use App\User;
use App\Models\Post;
use App\Services\MediaService;

class PostService
{
    private $mediaSrv;

    function __construct(MediaService $mediaSrv) {
        $this->mediaSrv = $mediaSrv;
    }

    public function findByCtgry($categoryId) {
        return Post::where('category_id', $categoryId)->get();
    }

    public function findById($id) {
        return Post::find($id);
    }

    private function createCategory($payload) {
        $post = [];
        
        $post["title"] = $payload["title"];
        $post["description"] = $payload["description"];
        $post["category_id"] = $payload["category_id"];
        
        return $post;
    }

    public function create($payload, $user_id) {
        $user = User::find($user_id);
        $post = $this->createCategory($payload);
        $result = $user->post()->create($post);

        if (isset($payload["media"]) && count($payload["media"]) > 0) {
            $medias = ($this->mediaSrv->findByIds($payload["media"]))->toArray();
            $fetchPost = $this->findById($result["id"]);
            $records = $fetchPost->media()->createMany($medias);
            
            return ["post" => $result, "media" => $medias];
        }

        return $result;
    }
}
