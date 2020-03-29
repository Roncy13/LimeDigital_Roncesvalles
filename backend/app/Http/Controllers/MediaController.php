<?php

namespace App\Http\Controllers;

use App\Services\MediaService;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Media\MediaCreate;

class MediaController extends Controller
{
    //
    private $service;

    function __construct(MediaService $service) {
        $this->service = $service;
    }

    public function create(MediaCreate $request) {
        $file = $request->file('photo') ? $request->file('photo') : $request->file('video');
        $id = Auth::user()->id;
        $result = $this->service->create($file, $id);

        return response()->json(["data" => $result]);
    }

    private function setMedia($id, $user_id) {
        $media = new Media();
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
}
