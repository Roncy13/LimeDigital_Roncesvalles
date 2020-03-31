<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostMedia extends Model
{
    //

    protected $table = 'post_media';
    protected $fillable = ['post_id', 'name', 'path', 'type'];
}
