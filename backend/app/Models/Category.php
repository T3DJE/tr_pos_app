<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama_category"
    ];

    public function produks(){
        return $this->hasMany(Category::class, 'id_category');
    }
}
