<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\PostService;
use App\Utilities\StatusCodes;
use App\Services\CategoryService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Category\CategoryCreate;

class CategoryController extends Controller
{
    private $service;
    private $postService;

    function __construct(CategoryService $service, PostService $postService) {
        $this->service = $service;
        $this->postService = $postService;
    }

    public function create(CategoryCreate $request) {
        $payload = $request->all();
        $result = $this->service->create($payload, Auth::user()->id);

        return $this->response($result, "Category has been added Successfully...!");
    }

    public function view(Request $request) {
        $id = Auth::user()->id;
        $result = $this->service->retrieveAll($id);
        
        return $this->response($result, "List of your Categories...!"); 
    }

    public function update(CategoryCreate $request, $id) {
        $payload = $request->all();
        $category = $this->setCategory($id);
        $this->authorize("update", $category);
        $result = $this->service->update($payload, $id);

        return $this->response($result, "Category has been updated Successfully...!"); 
    }

    public function destroy(Request $request, $id) {
        $category = $this->setCategory($id);
        $this->authorize("destroy", $category);

        $used = $this->postService->findByCtgry($category->id);

        if (count($used) > 0) {
            return $this->response((object)[], "Category cannot be deleted, it is being used by your post", StatusCodes::MIDDLEWARE);
        }

        $result = $this->service->destroy($id);

        return $this->response($result, "Category has been deleted Successfully...!");
    }

    private function setCategory($id) : Category {
        $category = new Category();
        $category->id = $id;

        return $category;
    }
}
