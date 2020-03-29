<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    private $service;

    function __construct(CategoryService $service) {
        $this->service = $service;
    }

    public function create(Request $request) {
        $payload = $request->all();
        $result = $this->service->create($payload, Auth::user()->id);

        return response()->json(["data" => $result]);
    }

    public function update(Request $request, $id) {
        $payload = $request->all();
      
        $category = new Category();
        $category->id = $id;

        $this->authorize("update", $category);
        $result = $this->service->update($payload, $id);

        return response()->json(["data" => $result]);
    }
}
