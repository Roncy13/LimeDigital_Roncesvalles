<?php

namespace App\Services;

use App\User;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;

class MediaService
{
    
    public function create($file, $user_id, $type) { 
        $name = $file->getClientOriginalName();
        $path = Storage::put("public/{$user_id}/{$type}", $file);
        $path = str_replace("public/", "storage/", $path);
        $user = User::find($user_id);
        $payload = ["name" => $name, "path" => $path, "type" => $type];
        
        return $user->media()->create($payload);
    }

    public function update($file, $id, $user_id) { 
        $name = $file->getClientOriginalName();
        $path = $file->store($user_id);
        
        $media = Media::find($id);
        $media->path = $path;
        $media->name = $name;
        $media->user_id = $user_id;

        return $media->save();
    }

    public function findById($id) {
        return Media::find($id);
    }

    public function findByIds($ids) {
        return Media::whereIn('id', $ids)->get();;
    }

    public function retrieveAll($user_id) {
        return Media::where('user_id', $user_id)->orderBy("id", "desc")->get();
    }

    public function destroy($id) {
        return Media::destroy($id);
    }
}
