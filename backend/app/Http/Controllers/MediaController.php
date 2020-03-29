<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Media\MediaCreate;
use App\Services\MediaService;

class MediaController extends Controller
{
    //
    private $service;

    function __construct(MediaService $service) {
        $this->service = $service;
    }

    public function create(Request $request) {
        $file = $request->file('photo') ? $request->file('photo') : $request->file('video');
        $id = Auth::user()->id;
        $result = $this->service->create($file, $id);

        return response()->json(["data" => $result]);
    }
}
