<?php

namespace App\Services;

use App\Models\Media;
use App\User;
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
}
