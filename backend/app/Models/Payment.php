<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama_payment"
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
