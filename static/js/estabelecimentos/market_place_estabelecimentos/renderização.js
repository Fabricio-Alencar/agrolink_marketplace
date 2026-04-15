// ===============================
// 4. RENDERIZAÇÃO (Responsável só por UI)
// ===============================

import { DOM } from './acesso_a_elementos_DOM.js';
import { formatarPreco, renderizarEstrelas } from './estrelas_formatacao_preco.js';
import { abrirModal } from './modal.js';



function limparGrid() {
    DOM.grid.innerHTML = '';
}

function atualizarContador(qtd) {
    DOM.resultsCount.textContent = `${qtd} Produtos encontrados`;
}

function criarCard(prod) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}" class="product-img">
        <div class="product-info">
            <h3 class="product-title">${prod.name}</h3>
            <span class="product-tag">${prod.category}</span>
            <p class="product-desc">${prod.desc}</p>
            <div class="price-row">
                <div class="price">R$ ${formatarPreco(prod.price)} <span>/${prod.unit}</span></div>
                <div class="stock">Total: ${prod.stock} ${prod.unit}</div>
            </div>
            <div class="producer-info">${prod.producer}</div>
            <div class="rating">
                ${renderizarEstrelas(prod.rating)}
                <span>(${prod.rating.toFixed(1)})</span>
            </div>
            <div class="location">
                ${prod.city}, ${prod.state} • ${prod.distance.toFixed(1).replace('.', ',')}km
            </div>
            <button class="btn-negociar" onclick="abrirModal(${prod.id})">Negociar</button>
        </div>
    `;

    return card;
}

export function renderizarProdutos(lista) {
    limparGrid();
    atualizarContador(lista.length);

    if (lista.length === 0) {
        DOM.grid.innerHTML = '<p>Nenhum produto encontrado</p>';
        return;
    }

    lista.forEach(p => DOM.grid.appendChild(criarCard(p)));
}
