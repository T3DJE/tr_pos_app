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
        "nama_produk",
        "stok_produk",
        "harga_produk",
        "category_produk",
        "gambar_produk"
    ];
}
