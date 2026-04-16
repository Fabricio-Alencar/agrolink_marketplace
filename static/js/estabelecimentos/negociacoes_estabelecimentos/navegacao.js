import { ordersData } from "./dados_mock.js";
import { deleteOrder } from "./filtros_botao_excluir.js"; // Importando a lógica de deletar

export function showDetails(id) {
    const order = ordersData.find(o => o.id === id);
    if (!order) return;

    const container = document.getElementById('details-content');
    const statusClass = order.status.toLowerCase();

    container.innerHTML = `
        <div class="details-header">
            <h2>Detalhes do Pedido</h2>
            <span class="badge ${statusClass}" style="font-size: 14px; padding: 6px 16px;">${order.status}</span>
        </div>
        <div class="details-grid">
            <div class="col-left">
                <div class="info-group">
                    <span class="info-label">📦 Produto:</span>
                    <span class="info-value">${order.product}</span>
                </div>
                <div style="display:flex; gap:40px; margin-bottom:24px;">
                    <div>
                        <span class="info-label">Quantidade:</span>
                        <span class="info-text">${order.qty}</span>
                    </div>
                    <div>
                        <span class="info-label">Preço:</span>
                        <span class="info-text">R$ ${order.price}/kg</span>
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">📅 Data de entrega:</span>
                    <span class="info-text">${order.date}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">Descrição do Pedido:</span>
                    <textarea class="desc-box" readonly>${order.desc}</textarea>
                </div>
            </div>
            <div class="col-right">
                <img src="${order.img}" alt="${order.product}" class="product-img">
                <div class="info-group">
                    <span class="info-label">🤝 Negociante:</span>
                    <span class="info-value" style="font-size:18px;">${order.producer}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">📍 Localização:</span>
                    <span class="info-text">${order.location}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">👤 Contatos:</span>
                    <ul class="contact-list">
                        <li><strong>Email:</strong> ${order.contacts.email}</li>
                        <li><strong>Whatsapp:</strong> ${order.contacts.wpp}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="action-buttons">
            <button class="btn-action btn-finalize" id="btnFinalize">Finalizar Pedido</button>
            <button class="btn-action btn-cancel" id="btnCancelOrder">Cancelar Pedido</button>
        </div>
    `;

    document.getElementById('view-lista').style.display = 'none';
    document.getElementById('view-detalhes').style.display = 'block';
    
    // --- LÓGICA DOS BOTÕES ---

    // Botão Vermelho: Agora ele CANCELA (deleta) o pedido e volta para a lista
    document.getElementById('btnCancelOrder').onclick = () => {
        deleteOrder(order.id); 
        hideDetails(); // Volta para a lista após deletar
    };

    // Botão Verde (Finalizar): Aqui você pode adicionar uma lógica futura
    document.getElementById('btnFinalize').onclick = () => {
        alert("Pedido finalizado com sucesso!");
        hideDetails();
    };

    window.scrollTo(0, 0);
}

export function hideDetails() {
    document.getElementById('view-detalhes').style.display = 'none';
    document.getElementById('view-lista').style.display = 'block';
}

window.hideDetails = hideDetails;