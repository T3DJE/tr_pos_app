<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_id",
        "status",
        "kembalian"
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, "order_id");
    }
}
