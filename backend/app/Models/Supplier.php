<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama_supplier",
        "alamat_supplier",
        "nama_produk",
        "stok_produk"
    ];

    public function produks(){
        return $this->hasMany(Produk::class, 'id_supplier');
    }
}
