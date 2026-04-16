import { renderOrders } from "./renderizacao.js";
import { ordersData } from "./dados_mock.js";
import { initFilters } from "./filtros_botao_excluir.js";
import { initDrawer } from "./drawer.js";

window.addEventListener("DOMContentLoaded", () => {
    renderOrders(ordersData);
    initFilters();
    initDrawer();
});