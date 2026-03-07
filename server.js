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

let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarInterface();
    
    // Feedback visual rápido no botão
    const btnCount = document.getElementById('cart-count');
    btnCount.classList.remove('hidden');
    btnCount.innerText = carrinho.length;
}

function toggleCarrinho() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

function atualizarInterface() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-zinc-500 text-center mt-10">Seu carrinho está vazio.</p>';
        totalElement.innerText = 'R$ 0,00';
        return;
    }

    container.innerHTML = carrinho.map((item, index) => `
        <div class="flex justify-between items-center bg-[#121212] p-4 rounded-xl border border-zinc-800">
            <div>
                <p class="font-medium">${item.nome}</p>
                <p class="text-blue-500 font-bold">R$ ${item.preco.toFixed(2)}</p>
            </div>
            <button onclick="removerDoCarrinho(${index})" class="text-red-500 hover:text-red-400">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalElement.innerText = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarInterface();
    document.getElementById('cart-count').innerText = carrinho.length;
    if(carrinho.length === 0) document.getElementById('cart-count').classList.add('hidden');
}

function finalizarCompra() {
    if (carrinho.length === 0) return alert("Adicione itens para comprar!");
    alert("Gerando chave PIX da Azure Digital...");
    // Aqui conectaremos com seu checker.js do Nubank
}
