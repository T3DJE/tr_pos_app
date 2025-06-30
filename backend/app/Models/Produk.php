<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $fillable = [
        "id",
        "kode_produk",
        "harga_produk",
        "id_category",
        "id_supplier",
        "image"
    ];

    public function supplier(){
        return $this->belongsTo(Supplier::class, 'id_supplier');
    }

    public function category(){
        return $this->belongsTo(Category::class, 'id_category');
    }
}
