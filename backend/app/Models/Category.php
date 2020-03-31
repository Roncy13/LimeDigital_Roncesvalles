<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['description'];
    protected $casts = [
        'created_at'  => 'datetime:Y-m-d g:i A',
        'updated_at' => 'datetime:Y-m-d g:i A',
    ];
    public function users() {
        return $this->belongsTo("App/User");
    }
}
