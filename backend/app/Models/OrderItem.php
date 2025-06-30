<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_id",
        "id_product",
        "quantity"
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function produks()
    {
        return $this->belongsTo(Produk::class, 'id_product');
    }
}
