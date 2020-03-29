<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $table = 'post';
    protected $fillable = ['title', 'description'];

    public function users() {
        return $this->belongsTo("App/User");
    }
}
