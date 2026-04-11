// No topo do seu arquivo JS
let produtoParaExcluir = null;

function prepararExclusao(nome) {
    // Verifique no console se o nome está chegando corretamente aqui
    console.log("Preparando para excluir:", nome); 
    
    produtoParaExcluir = nome;
    const modal = document.getElementById("modalExcluir");
    const mensagem = document.getElementById("mensagemExcluir");
    
    if (modal && mensagem) {
        mensagem.innerHTML = `Tem certeza que deseja excluir o produto <strong>"${nome}"</strong>? Esta ação não pode ser desfeita.`;
        modal.classList.add("active");
    }
}

function fecharModalExcluir() {
    const modal = document.getElementById("modalExcluir");
    if (modal) modal.classList.remove("active");
    produtoParaExcluir = null;
}

// Substitua o seu bloco de Evento por este:
const botaoConfirmarExclusao = document.getElementById("btnConfirmarExclusao");

if (botaoConfirmarExclusao) {
    botaoConfirmarExclusao.onclick = () => {
        if (produtoParaExcluir !== null) {
            // Busca o índice no array global 'produtos'
            const indice = produtos.findIndex(p => p.nome === produtoParaExcluir);
            
            if (indice !== -1) {
                // Remove o item
                produtos.splice(indice, 1);
                
                // Atualiza a visualização
                renderProdutos(produtos);
                
                // Notificação de sucesso
                exibirNotificacao('exclusao', `Produto "${produtoParaExcluir}" removido com sucesso!`);
                
                // Fecha o modal
                fecharModalExcluir();
            } else {
                console.error("Produto não encontrado no array:", produtoParaExcluir);
            }
        } else {
            console.warn("Tentativa de exclusão com produto nulo.");
        }
    };
}