<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $table = 'post';
    protected $fillable = ['title', 'description', 'category_id'];

    public function users() {
        return $this->belongsTo("App\User", "user_id");
    }

    public function category() {
        return $this->belongsTo("App\Models\Category");
    }

    public function postMedia() {
        return $this->hasMany("App\Models\PostMedia", "post_id");
    }
}
