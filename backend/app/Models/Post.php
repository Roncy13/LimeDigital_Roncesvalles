<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $table = 'post';
    protected $fillable = ['title', 'description', 'category_id'];

    public function users() {
        return $this->belongsTo("App/User");
    }

    public function media() {
        return $this->hasMany("App\Models\PostMedia");
    }
}
