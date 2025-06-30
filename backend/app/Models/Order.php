<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "total_produk",
        "discount",
        "total_harga",
        "payment_method"
    ];

    public function riwayat()
    {
        return $this->hasMany(Riwayat::class);
    }
}
