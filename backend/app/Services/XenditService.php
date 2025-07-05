<?php

namespace App\Services;

use Xendit\Xendit;

class XenditService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        Xendit::setApiKey(env('XENDIT_SECRET_KEY'));
    }

    public function createInvoice($order)
    {
        $params = [
            'external_id' => 'order-' . $order->id,
            'payer_email' => 'customer@example.com',
            'description' => 'Pembayaran untuk Order #' . $order->id,
            'amount' => $order->total_harga,
            'success_redirect_url' => 'https://yourdomain.com/success',
            'failure_redirect_url' => 'https://yourdomain.com/failed',
        ];

        $invoice = \Xendit\Invoice::create($params);
        return $invoice['invoice_url'];
    }
}
