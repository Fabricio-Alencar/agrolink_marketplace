import { produtosMock } from './dados_mock.js';
import { renderizarProdutos } from './renderização.js';
import { fecharModal, emitirPedido, abrirModal } from './modal.js';
import './drawer_eventos.js';

window.fecharModal = fecharModal;
window.emitirPedido = emitirPedido;
window.abrirModal = abrirModal;

renderizarProdutos(produtosMock);