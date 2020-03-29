<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth; 
use App\Repositories\Contracts\PostRepository;
class PostController extends Controller
{
    private $repository;

    function __construct(PostRepository $repository) {
        $this->repository = $repository;
    }

    public function create(Request $request, Post $post) {
        $this->authorize('create', $post);
        $payload = $request->all();
        $result = $this->repository->create($payload, Auth::user());

        return response()->json(["data" => $result]);
    }

    public function sample(Request $request) {
        return response()->json(["data" => "sample"]);
    }
}
