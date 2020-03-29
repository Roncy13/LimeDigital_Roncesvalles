<?php

namespace App\Services;

use App\User;
use App\Models\Media;

class MediaService
{
    //

    public function create($file, $user_id) { 
        $name = $file->getClientOriginalName();
        $path = $file->store($user_id);
        $user = User::find($user_id);
        $payload = ["name" => $name, "path" => $path];
        
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
}
