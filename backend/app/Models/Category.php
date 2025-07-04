<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
