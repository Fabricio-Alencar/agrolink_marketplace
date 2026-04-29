// ===============================
// 5. FILTROS (LÓGICA)
// ===============================
import { DOM } from './acesso_a_elementos_DOM.js';
import { API } from './api.js';
import { renderizarProdutos } from './renderizacao.js';

// ===============================
// PEGAR FILTROS
// ===============================
function obterFiltros() {
    const filtros = {
        termo: DOM.searchInput.value.toLowerCase(),
        categoria: DOM.filterCat.value,
        estado: DOM.filterEstado.value,
        cidade: DOM.filterCidade.value
    };

    console.log("🎯 Filtros:", filtros);

    return filtros;
}

// ===============================
// FILTRAR LISTA
// ===============================
function filtrar(lista, filtros) {
    const termo = filtros.termo.trim().toLowerCase();

    const resultado = lista.filter(p => {

        const nome = (p.nome || '').toLowerCase();
        const produtor = (p.produtor_nome || '').toLowerCase();

        const estado = (p.produtor_estado || '').trim().toLowerCase();
        const cidade = (p.produtor_cidade || '').trim().toLowerCase();

        return (
            (nome.includes(termo) || produtor.includes(termo)) &&

            (filtros.categoria === 'Todos' || p.categoria === filtros.categoria) &&

            (filtros.estado === '' || estado === filtros.estado.trim().toLowerCase()) &&

            (filtros.cidade === '' || cidade === filtros.cidade.trim().toLowerCase())
        );
    });

    return resultado;
}

// ===============================
// APLICAR FILTROS
// ===============================
export async function aplicarFiltros() {
    try {
        console.log("🚀 Aplicando filtro...");

        const lista = await API.listarProdutos();
        console.log("📦 Lista original:", lista);

        const filtros = obterFiltros();
        const resultado = filtrar(lista, filtros);

        // 🔥 render centralizado
        renderizarProdutos(resultado);

    } catch (e) {
        console.error("❌ Erro filtro:", e);
    }
}

// ===============================
// EVENTOS
// ===============================
DOM.searchInput.addEventListener('input', aplicarFiltros);
DOM.filterCat.addEventListener('change', aplicarFiltros);
DOM.filterEstado.addEventListener('change', aplicarFiltros);
DOM.filterCidade.addEventListener('change', aplicarFiltros);
