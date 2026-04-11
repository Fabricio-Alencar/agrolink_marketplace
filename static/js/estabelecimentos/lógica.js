// --- 1. Dados Mockados ---
const produtosMock = [
    { id: 1, name: "Banana Orgânica", category: "Frutas", desc: "Banana Organica, fresca e direto da fazenda para sua mesa, colhida de forma sustentável.", price: 4.80, unit: "kg", stock: 150, producer: "Fazenda Feliz", rating: 4.89, state: "SP", city: "Campinas", distance: 5.6, img: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Maçã Fuji Premium", category: "Frutas", desc: "Maçãs crocantes, selecionadas manualmente com alto padrão de qualidade.", price: 7.50, unit: "kg", stock: 80, producer: "Sítio das Frutas", rating: 3.5, state: "MG", city: "Poços de Caldas", distance: 45.2, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80" }, // Nota ajustada para testar a meia estrela
    { id: 3, name: "Queijo Minas Frescal", category: "Laticínios", desc: "Queijo artesanal feito diariamente com leite puro e muito cuidado.", price: 25.00, unit: "un", stock: 20, producer: "Laticínio Vale", rating: 4.98, state: "MG", city: "Poços de Caldas", distance: 48.0, img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Alface Crespa", category: "Vegetais", desc: "Folhas verdes cultivadas em horta hidropônica, sem agrotóxicos.", price: 2.50, unit: "un", stock: 100, producer: "Horta Urbana", rating: 4.50, state: "SP", city: "São Paulo", distance: 12.4, img: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Feijão Carioca Novo", category: "Grãos", desc: "Feijão colhido recentemente, cozinha rápido e tem caldo grosso.", price: 8.90, unit: "kg", stock: 300, producer: "Fazenda Sol", rating: 4.2, state: "PR", city: "Londrina", distance: 95.0, img: "https://images.unsplash.com/photo-1551326844-4df70f7454ab?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Tomate Carmem", category: "Vegetais", desc: "Tomates maduros, ideais para saladas e molhos rústicos.", price: 6.20, unit: "kg", stock: 60, producer: "Horta Urbana", rating: 2.8, state: "SP", city: "São Paulo", distance: 11.2, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80" } // Nota ajustada para testar estrelas vazias
];

// --- 2. Elementos DOM ---
const grid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');

// Inputs de Filtro
const searchInput = document.getElementById('searchInput');
const filterCat = document.getElementById('filterCategory');
const filterState = document.getElementById('filterState');
const filterCity = document.getElementById('filterCity');
const filterDist = document.getElementById('filterDistance');
const distLabel = document.getElementById('distLabel');

// Modal Elements
const modal = document.getElementById('orderModal');
let produtoSelecionado = null;

// NOVO: Drawer Elements (Seleção dos elementos criados no HTML)
const menuBtn = document.querySelector('.menu-icon');
const drawerOverlay = document.getElementById('drawerOverlay');
const sideDrawer = document.getElementById('sideDrawer');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');



// NOVO: Função para renderizar as Estrelas Dinamicamente via JS (Cheia, Meia ou Vazia)
function renderizarEstrelas(nota) {
    const starColor = "#ffd700"; // Cor da estrela
    const emptyColor = "#e0e0e0"; // Cor do fundo vazio
    let htmlStr = '<div style="display:flex; align-items:center; gap:2px;">';

    for (let i = 1; i <= 5; i++) {
        if (nota >= i) {
            // Estrela Cheia
            htmlStr += `<svg width="16" height="16" viewBox="0 0 24 24" fill="${starColor}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        } else if (nota >= i - 0.5) {
            // Meia Estrela (usando SVG linearGradient de preenchimento 50%)
            htmlStr += `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <defs>
                        <linearGradient id="halfGrad${i}">
                            <stop offset="50%" stop-color="${starColor}"/>
                            <stop offset="50%" stop-color="${emptyColor}"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGrad${i})" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>`;
        } else {
            // Estrela Vazia
            htmlStr += `<svg width="16" height="16" viewBox="0 0 24 24" fill="${emptyColor}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
        }
    }
    htmlStr += '</div>';
    return htmlStr;
}

// --- 3. Renderização ---
function renderizarProdutos(produtos) {
    grid.innerHTML = '';
    resultsCount.textContent = `${produtos.length} Produtos encontrados`;

    if(produtos.length === 0) {
        grid.innerHTML = '<p style="color: #777; grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum produto encontrado com os filtros atuais.</p>';
        return;
    }

    produtos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${prod.name}</h3>
                <span class="product-tag">${prod.category}</span>
                <p class="product-desc">${prod.desc}</p>
                
                <div class="price-row">
                    <div class="price">R$ ${prod.price.toFixed(2).replace('.', ',')} <span>/${prod.unit}</span></div>
                    <div class="stock">Total: ${prod.stock} ${prod.unit}</div>
                </div>

                <div class="producer-info">${prod.producer}</div>
                
                <div class="rating">
                    ${renderizarEstrelas(prod.rating)} 
                    <span>(${prod.rating.toFixed(1)})</span>
                </div>
                
                <div class="location">
                    <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    ${prod.city}, ${prod.state} • ${prod.distance.toFixed(1).replace('.', ',')}km
                </div>

                <button class="btn-negociar" onclick="abrirModal(${prod.id})">
                    <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    Negociar
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- 4. Lógica de Filtros ---
function aplicarFiltros() {
    const termo = searchInput.value.toLowerCase();
    const cat = filterCat.value;
    const uf = filterState.value;
    const cid = filterCity.value;
    const distMax = parseFloat(filterDist.value);

    distLabel.textContent = distMax;

    const filtrados = produtosMock.filter(p => {
        const matchTexto = p.name.toLowerCase().includes(termo) || p.producer.toLowerCase().includes(termo);
        const matchCat = cat === 'Todos' || p.category === cat;
        const matchUF = uf === 'Todos' || p.state === uf;
        const matchCid = cid === 'Todos' || p.city === cid;
        const matchDist = p.distance <= distMax;

        return matchTexto && matchCat && matchUF && matchCid && matchDist;
    });

    renderizarProdutos(filtrados);
}

// Event Listeners para filtros
searchInput.addEventListener('input', aplicarFiltros);
filterCat.addEventListener('change', aplicarFiltros);
filterState.addEventListener('change', aplicarFiltros);
filterCity.addEventListener('change', aplicarFiltros);
filterDist.addEventListener('input', aplicarFiltros);

// NOVO: Event Listeners para o Menu Lateral (Drawer)
function toggleDrawer() {
    sideDrawer.classList.toggle('active');
    drawerOverlay.classList.toggle('active');
}

// Vincula eventos aos botões e overlay do Drawer
menuBtn.addEventListener('click', toggleDrawer);
closeDrawerBtn.addEventListener('click', toggleDrawer);
drawerOverlay.addEventListener('click', toggleDrawer);


// --- 5. Lógica do Modal de Pedido ---
const inputQtd = document.getElementById('inputQtd');
const inputData = document.getElementById('inputData');
const inputDesc = document.getElementById('inputDesc');

function abrirModal(idProduto) {
    produtoSelecionado = produtosMock.find(p => p.id === idProduto);
    if(!produtoSelecionado) return;

    // Resetar form
    inputQtd.value = '';
    inputData.value = '';
    inputDesc.value = '';

    // Popular Textos Iniciais
    document.getElementById('modalUnit').textContent = produtoSelecionado.unit.charAt(0).toUpperCase() + produtoSelecionado.unit.slice(1);
    document.getElementById('resumoProduto').textContent = produtoSelecionado.name;
    document.getElementById('resumoProdutor').textContent = produtoSelecionado.producer;
    document.getElementById('resumoQtd').textContent = `- ${produtoSelecionado.unit}`;
    document.getElementById('resumoData').textContent = '-';

    modal.classList.add('active');
}

function fecharModal() {
    modal.classList.remove('active');
    produtoSelecionado = null;
}

// Atualização em Tempo Real do Resumo
inputQtd.addEventListener('input', (e) => {
    const val = e.target.value;
    const unit = produtoSelecionado ? produtoSelecionado.unit : '';
    document.getElementById('resumoQtd').textContent = val ? `${val} ${unit}` : `- ${unit}`;
});

inputData.addEventListener('change', (e) => {
    const val = e.target.value;
    if(val) {
        const parts = val.split('-');
        document.getElementById('resumoData').textContent = `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else {
        document.getElementById('resumoData').textContent = '-';
    }
});

// Emitir Pedido (Gerar JSON)
function emitirPedido() {
    if(!inputQtd.value || !inputData.value) {
        alert("Por favor, preencha a Quantidade e a Data de Entrega.");
        return;
    }

    const pedidoObj = {
        produto: produtoSelecionado.name,
        produtor: produtoSelecionado.producer,
        quantidade: parseFloat(inputQtd.value),
        unidade: produtoSelecionado.unit,
        data_entrega: inputData.value,
        descricao: inputDesc.value || null
    };

    const jsonString = JSON.stringify(pedidoObj, null, 2);
    
    console.log("=== NOVO PEDIDO GERADO ===");
    console.log(jsonString);
    
    alert("Pedido gerado com sucesso!\nVerifique o console para ver o objeto JSON.\n\nResumo:\n" + 
          `${pedidoObj.quantidade} ${pedidoObj.unidade} de ${pedidoObj.produto} para o dia ${pedidoObj.data_entrega.split('-').reverse().join('/')}`);
    
    fecharModal();
}

// Inicializar
renderizarProdutos(produtosMock);