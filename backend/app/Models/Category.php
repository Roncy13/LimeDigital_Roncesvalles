<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['description'];

    public function users() {
        return $this->belongsTo("App/User");
    }
}
