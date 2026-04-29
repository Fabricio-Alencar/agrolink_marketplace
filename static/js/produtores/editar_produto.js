/**
 * ARQUIVO: editar_produto.js
 * OBJETIVO: Lógica para edição recebendo o objeto direto da lista.
 */

async function prepararEdicao(produto) {
    // 🛡️ Segurança: se o objeto não veio, aborta
    if (!produto) return;

    // 1. Preenche a interface com o que já temos na memória
    document.querySelector("#modalProduto h2").innerText = "Editar Produto";
    document.getElementById("editandoNomeOriginal").value = produto.id; 

    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("categoriaProduto").value = produto.categoria;
    document.getElementById("unidadeProduto").value = produto.unidade; // Seta a unidade
    document.getElementById("descricaoProduto").value = produto.descricao || "";
    document.getElementById("precoProduto").value = produto.preco;
    document.getElementById("quantidadeProduto").value = produto.quantidade;

    // 2. Lida com a imagem (Preview)
    if (produto.foto) {
        const caminhoFoto = produto.foto.startsWith('http') ? produto.foto : `../static/${produto.foto}`;
        preview.src = caminhoFoto;
        preview.style.display = "block";
        placeholder.style.display = "none";
    }

    // 3. Abre o modal e sincroniza os labels dinâmicos
    document.getElementById("modalProduto").classList.add("active");
    atualizarLabelsUnidade(); // Chama a função que criamos no form_base.js
}

async function executarEdicao(formData) {
    const idParaEditar = document.getElementById("editandoNomeOriginal").value;
    if (!idParaEditar || !formData) return;

    try {
        const resultado = await API.atualizarProduto(idParaEditar, formData);
        
        if (resultado && !resultado.erro) {
            agendarNotificacao('edicao', "Alterações salvas com sucesso!");
            fecharModal();
            window.location.reload();
        } else {
            exibirNotificacao('erro', resultado?.erro || "Erro ao atualizar!");
        }

    } catch (error) {
        console.error("Erro na edição:", error);
        exibirNotificacao('erro', "Erro de conexão com o servidor!");
    }
}