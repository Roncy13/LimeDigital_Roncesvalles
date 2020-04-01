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

    public function retrieve() {
        $id = Auth::user()->id;
        $result = $this->service->retrieveAll($id);
        return $this->response($result, "Media has been retrieved Successfully...!");   
    }

    public function create(MediaCreate $request) {
        $file = $request->file('photo') ? $request->file('photo') : $request->file('video');
        $id = Auth::user()->id;
        $type = $request->file('photo') ? 'photo' : 'video';
        $result = $this->service->create($file, $id, $type);

        return $this->response($result, "Media has been created Successfully...!");    
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
        $type = $request->file('photo') ? 'photo' : 'video';
        $result = $this->service->update($file, $id, $user_id, $type);

        return $this->response($result, "Media has been updated Successfully...!");    
    }

    public function destroy(Request $request, $id) {
        $user_id = Auth::user()->id;
        $media = $this->setMedia($id, $user_id);

        $this->authorize("destroy", $media);

        $result = $this->service->destroy($id);

        return $this->response($result, "Media has been deleted Successfully...!");    
    }
}
