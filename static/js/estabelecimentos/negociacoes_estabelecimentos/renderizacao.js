import { showDetails } from "./navegacao.js";
import { deleteOrder } from "./filtros_botao_excluir.js";

export function renderOrders(data) {
    const grid = document.getElementById('orders-grid');
    if (!grid) return;

    grid.innerHTML = '';

    data.forEach(order => {
        const statusClass = order.status.toLowerCase();
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="producer-name">${order.producer}</div>
                    <div class="product-name">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.19v6.72zm14 0v-6.72l-6 3.39v6.71l6-3.38z"/></svg>
                        ${order.product}
                    </div>
                </div>
                <span class="badge ${statusClass}">${order.status}</span>
            </div>
            <div class="card-body">
                <div class="price-row">
                    <span class="qty">Quantidade<br><strong>${order.qty}</strong></span>
                    <span class="price">Preço<br>R$ ${order.price}/kg</span>
                </div>
                <div class="desc">${order.desc}</div>
                <div class="info-row">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
                    Entrega: ${order.date}
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-details">Detalhes</button>
                <button class="btn-delete">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </div>
        `;

        // Eventos vinculados via JS
        card.querySelector('.btn-details').onclick = () => showDetails(order.id);
        card.querySelector('.btn-delete').onclick = () => deleteOrder(order.id);

        grid.appendChild(card);
    });
}