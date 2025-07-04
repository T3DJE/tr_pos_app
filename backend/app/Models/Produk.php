<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produk extends Model
{
    use HasFactory;
    protected $fillable = [
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

    public function orderitem(){
        return $this->hasMany(OrderItem::class);
    }
}
