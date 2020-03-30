<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; 
use App\Services\PostService;

class PostController extends Controller
{

    private $service;

    function __construct(PostService $service) {
        $this->service = $service;
    }
    
    public function retrieve() {
        $id = Auth::user()->id;
        $result = $this->service->retrieveAll($id);

        return $this->response($result, "Your List of Post...!");   
    }

    public function create(Request $request) {
        $payload = $request->only(["title", "description", "media", "category_id"]);
        $id = Auth::user()->id;
        $result = $this->service->create($payload, $id);

        return $this->response($result, "Your Post has been created Successfully...!"); 
    }

    private function setMedia($id, $user_id) {
        $post = new Post();
        $post->id = $id;
        $post->user_id = $user_id;

        return $post;
    }

    public function update(Request $request, $id) {
        $payload = $request->only(["title", "description", "media", "category_id"]);
        $user_id = Auth::user()->id;
        $media = $this->setMedia($id, $user_id);
        //$this->authorize("update", $media);
        $result = $this->service->update($payload, $id);

        return $this->response($result, "Your Post has been updated Successfully...!");    
    }

    public function destroy(Request $request, $id) {
        $user_id = Auth::user()->id;
        $media = $this->setMedia($id, $user_id);

        $this->authorize("destroy", $media);

        $result = $this->service->destroy($id);

        return $this->response($result, "Your Post has been deleted Successfully...!");    
    }

    public function sample(Request $request) {
        $result = [ 
            "data" => "sample"
        ];

        return $this->response($result, "Sample");
    }
}
