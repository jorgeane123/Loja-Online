const apiURL = "https://fakestoreapi.com/products";
let produtos = [];
let carrinho = [];

// Carrega os produtos da API
async function carregarProdutos() {
    const response = await fetch(apiURL);
    produtos = await response.json();
    exibirProdutos();
}

// Exibe os produtos no catálogo
function exibirProdutos() {
    const produtosContainer = document.getElementById('produtos');
    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}" style="width: 100%; height: auto;">
            <h3>${produto.title}</h3>
            <p>${produto.description}</p>
            <p>Preço: R$ ${produto.price.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(div);
    });
}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemCarrinho = carrinho.find(item => item.id === id);
    
    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    exibirResumoCarrinho();
}

// Exibe o resumo do carrinho
function exibirResumoCarrinho() {
    const resumoContainer = document.getElementById('resumo-carrinho');
    resumoContainer.innerHTML = '';
    
    let total = 0;
    carrinho.forEach(item => {
        total += item.price * item.quantidade;
        resumoContainer.innerHTML += `
            <p>${item.title} - ${item.quantidade} x R$ ${item.price.toFixed(2)} = R$ ${(item.price * item.quantidade).toFixed(2)}</p>
        `;
    });
    resumoContainer.innerHTML += `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

// Finaliza a compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }
    // Aqui você pode integrar a funcionalidade do AfterShip
    alert('Compra finalizada!');

    // Limpa o carrinho
    carrinho = [];
    exibirResumoCarrinho();
});

// Carrega os produtos ao inicializar
carregarProdutos();
