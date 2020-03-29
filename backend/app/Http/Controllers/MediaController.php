<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Media\MediaCreate;
class MediaController extends Controller
{
    //

    public function create(MediaCreate $request) {
        
        return response()->json([]);
    }
}
