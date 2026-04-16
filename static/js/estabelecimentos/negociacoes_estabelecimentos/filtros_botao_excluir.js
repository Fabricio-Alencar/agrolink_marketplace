import { ordersData } from "./dados_mock.js";
import { renderOrders } from "./renderizacao.js";

export function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusTerm = document.getElementById('statusFilter').value;

    const filtered = ordersData.filter(order => {
        const matchesSearch =
            order.product.toLowerCase().includes(searchTerm) ||
            order.producer.toLowerCase().includes(searchTerm);

        const matchesStatus =
            statusTerm === 'Todos' || order.status === statusTerm;

        return matchesSearch && matchesStatus;
    });

    renderOrders(filtered);
}

export function deleteOrder(id) {
    if (confirm("Tem certeza que deseja excluir este pedido?")) {
        const index = ordersData.findIndex(o => o.id === id);
        if (index !== -1) ordersData.splice(index, 1);

        applyFilters();
    }
}

// inicializa eventos
export function initFilters() {
    document.getElementById('searchInput')
        .addEventListener('input', applyFilters);

    document.getElementById('statusFilter')
        .addEventListener('change', applyFilters);
}