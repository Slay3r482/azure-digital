const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// CONFIGURAÇÃO DA SUA LOJA
const CHAVE_PIX = "SUA_CHAVE_AQUI"; // Coloque seu CPF, E-mail ou Aleatória

// Rota Principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Simulação de Checkout para o Carrinho
app.post('/finalizar-pedido', (req, res) => {
    const { itens, total, email } = req.body;
    
    // Aqui seu checker.js (IMAP) entraria em ação monitorando o e-mail do Nubank
    console.log(`Novo pedido de ${email} totalizando R$ ${total}`);
    
    res.json({
        success: true,
        pix: CHAVE_PIX,
        message: "Aguardando confirmação do pagamento via Nubank..."
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Azure Digital rodando na porta ${PORT}`));
