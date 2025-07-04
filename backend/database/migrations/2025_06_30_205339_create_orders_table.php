<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("customer_name");
            $table->foreignId("id_payment")->constrained("payments")->onDelete("cascade");
            $table->unsignedBigInteger("id_member")->nullable();
            $table->foreign("id_member")->references("id")->on("members")->onDelete("cascade");
            $table->decimal("total_harga", 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
