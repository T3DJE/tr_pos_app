<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("customer_name");
            $table->foreignId("id_payment")->constrained("payments")->onDelete("cascade");
            $table->foreignId("id_member")->nullable()->constrained("members")->onDelete("cascade");
            $table->decimal("total_harga", 10, 2);
            $table->decimal("pembayaran", 10, 2)->nullable();
            $table->string("payment_link")->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
