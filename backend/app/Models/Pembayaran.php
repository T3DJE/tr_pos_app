<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $fillable = [
        "pembayaran",
        "kembalian",
        "order_id"
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, "order_id");
    }
}
