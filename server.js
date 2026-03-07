const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.use(express.json());

// Configure seu Token do Mercado Pago
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN 
});

// Rota para criar o pagamento PIX
app.post('/create-payment', async (req, res) => {
    const payment_data = {
        transaction_amount: 1.50,
        description: 'YouTube Premium - Azure Digital',
        payment_method_id: 'pix',
        payer: {
            email: req.body.email,
            first_name: 'Cliente',
            last_name: 'Azure'
        }
    };

    try {
        const payment = await mercadopago.payment.create(payment_data);
        res.json({
            qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
            id: payment.body.id
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// WEBHOOK: Entrega Automática quando o PIX é pago
app.post('/webhook', async (req, res) => {
    const { action, data } = req.body;

    if (action === "payment.updated") {
        const payment = await mercadopago.payment.get(data.id);
        
        if (payment.body.status === "approved") {
            console.log("PAGAMENTO APROVADO!");
            // LÓGICA DE ENTREGA:
            // 1. Buscar conta no banco de dados (Supabase)
            // 2. Enviar por e-mail ou via bot Discord
        }
    }
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log("Servidor Online!"));
