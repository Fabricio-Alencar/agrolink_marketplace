// ===============================
// 6. MODAL (Responsável só por comportamento do modal)
// ===============================

import { setProdutoSelecionado, getProdutoSelecionado, DOM } from './acesso_a_elementos_DOM.js';
import { produtosMock } from './dados_mock.js';


export function abrirModal(id) {
    const produto = produtosMock.find(p => p.id === id);
    if (!produto) return;

    setProdutoSelecionado(produto);

    DOM.inputQtd.value = '';
    DOM.inputData.value = '';
    DOM.inputDesc.value = '';

    DOM.modal.classList.add('active');
}

export function fecharModal() {
    DOM.modal.classList.remove('active');
    setProdutoSelecionado(null);
}

function criarPedido() {
    const produtoSelecionado = getProdutoSelecionado();

    return {
        produto: produtoSelecionado.name,
        produtor: produtoSelecionado.producer,
        quantidade: parseFloat(DOM.inputQtd.value),
        unidade: produtoSelecionado.unit,
        data_entrega: DOM.inputData.value,
        descricao: DOM.inputDesc.value || null
    };
}

export function emitirPedido() {
    if (!DOM.inputQtd.value || !DOM.inputData.value) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    const pedido = criarPedido();
    console.log(JSON.stringify(pedido, null, 2));
    alert("Pedido gerado com sucesso");
    fecharModal();
}