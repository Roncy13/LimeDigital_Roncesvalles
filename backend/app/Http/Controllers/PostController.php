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

        return response()->json(["data" => $result]);    
    }

    public function create(Request $request) {
        $payload = $request->only(["title", "description", "media", "category_id"]);
        $id = Auth::user()->id;
        $result = $this->service->create($payload, $id);

        return response()->json(["data" => $result]);
    }

    private function setMedia($id, $user_id) {
        $media = new Post();
        $media->id = $id;
        $media->user_id = $user_id;

        return $media;
    }

    public function update(MediaCreate $request, $id) {
        $user_id = Auth::user()->id;
        $media = $this->setMedia($id, $user_id);

        $this->authorize("update", $media);

        $file = $request->file('photo') ? $request->file('photo') : $request->file('video');
        $result = $this->service->update($file, $id, $user_id);

        return response()->json(["data" => $result]);
    }

    public function destroy(Request $request, $id) {
        $user_id = Auth::user()->id;
        $media = $this->setMedia($id, $user_id);

        $this->authorize("destroy", $media);

        $result = $this->service->destroy($id);

        return response()->json(["data" => $result]);    
    }
}
