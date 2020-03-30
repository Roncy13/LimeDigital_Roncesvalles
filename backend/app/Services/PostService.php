<?php

namespace App\Services;

use App\User;
use App\Models\Post;
use App\Services\MediaService;
use App\Models\PostMedia;
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

    private function setPost($payload) {
        $post = [];
        
        $post["title"] = $payload["title"];
        $post["description"] = $payload["description"];
        $post["category_id"] = $payload["category_id"];
        
        return $post;
    }

    public function create($payload, $user_id) {
        $user = User::find($user_id);
        $post = $this->setPost($payload);
        $result = $user->post()->create($post);

        if (isset($payload["media"]) && count($payload["media"]) > 0) {
            $medias = ($this->mediaSrv->findByIds($payload["media"]))->toArray();
            $fetchPost = $this->findById($result["id"]);
            $records = $fetchPost->media()->createMany($medias);

            return ["post" => $result, "media" => $medias];
        }

        return $result;
    }

    public function update($payload, $id) {
        $post = Post::find($id);
        $post->title = $payload["title"];
        $post->description = $payload["description"];
        $post->category_id = $payload["category_id"];
        $post->save();

        if (isset($payload["media"]) && count($payload["media"]) > 0) {
            $medias = ($this->mediaSrv->findByIds($payload["media"]))->toArray();
            $post->media()->delete();
            $records = $post->media()->createMany($medias);
            
            return ["post" => $post, "media" => $medias];
        }

        return $result;
    }

    public function destroy($id) {
        $post = $this->findById($id);
        $post->media()->destroy();

        return Post::destroy($id);
    }

    public function retrieveAll($user_id) {
        $post = Post::where('user_id', $user_id)->orderBy('id', 'desc')->get();

        return $post->load('postMedia');
    }
}
