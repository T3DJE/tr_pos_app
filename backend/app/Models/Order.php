<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "customer_name",
        "id_payment",
        "id_member",
        "total_harga"
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'id_payment');
    }

    public function history()
    {
        return $this->hasMany(PurchaseHistory::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'order_id');
    }
}
