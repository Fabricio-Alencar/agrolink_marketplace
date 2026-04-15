// ===============================
// 5. FILTROS (Responsável só por lógica)
// ===============================

import { DOM } from './acesso_a_elementos_DOM.js';
import { produtosMock } from './dados_mock.js';
import { renderizarProdutos } from './renderização.js';


function obterFiltros() {
    return {
        termo: DOM.searchInput.value.toLowerCase(),
        cat: DOM.filterCat.value,
        uf: DOM.filterState.value,
        cid: DOM.filterCity.value,
        dist: parseFloat(DOM.filterDist.value)
    };
}

function filtrarProdutos(lista, filtros) {
    return lista.filter(p => {
        return (
            (p.name.toLowerCase().includes(filtros.termo) || p.producer.toLowerCase().includes(filtros.termo)) &&
            (filtros.cat === 'Todos' || p.category === filtros.cat) &&
            (filtros.uf === 'Todos' || p.state === filtros.uf) &&
            (filtros.cid === 'Todos' || p.city === filtros.cid) &&
            p.distance <= filtros.dist
        );
    });
}

export function aplicarFiltros() {
    const filtros = obterFiltros();
    DOM.distLabel.textContent = filtros.dist;
    const resultado = filtrarProdutos(produtosMock, filtros);
    renderizarProdutos(resultado);
}
