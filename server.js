const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

// CONFIGURAÇÃO DA SUA CHAVE PIX
const MINHA_CHAVE_PIX = "SUA_CHAVE_AQUI"; 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para simular o checkout
app.post('/checkout', (req, res) => {
    const { email, produto } = req.body;
    // Aqui você retornaria os dados para o cliente pagar manualmente
    res.json({
        msg: "Pagamento via PIX",
        chave: MINHA_CHAVE_PIX,
        instrucoes: "Após pagar, o sistema enviará o produto para: " + email
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
