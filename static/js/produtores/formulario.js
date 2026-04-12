// ==========================================
// CONFIGURAÇÃO INICIAL E ELEMENTOS
// ==========================================
const uploadBox = document.getElementById("uploadBox");
const inputFile = document.getElementById("fotoProduto");

// Placeholder dinâmico
const placeholder = document.createElement("div");
placeholder.classList.add("upload-placeholder");
placeholder.innerHTML = `
    <img src="../static/assets/upload.png">
    <p>Arraste ou clique para selecionar</p>
`;
uploadBox.appendChild(placeholder);

// Preview da imagem
const preview = document.createElement("img");
preview.classList.add("upload-preview");
preview.style.display = "none"; // Começa escondido
uploadBox.appendChild(preview);

// ==========================================
// CONTROLE DO MODAL
// ==========================================
function abrirModal() {
    document.getElementById("modalProduto").classList.add("active");
}

function fecharModal() {
    document.getElementById("modalProduto").classList.remove("active");
    
    // Resetar título para o padrão
    document.querySelector("#modalProduto h2").innerText = "Adicionar Produto";
    
    // Limpar campo oculto de edição
    document.getElementById("editandoNomeOriginal").value = "";
    
    // Limpar todos os inputs de texto e número
    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
    document.getElementById("descricaoProduto").value = "";
    
    // Resetar Upload/Preview
    preview.src = "";
    preview.style.display = "none";
    placeholder.style.display = "block";
    inputFile.value = "";
}

// ==========================================
// LÓGICA DE EDIÇÃO E SALVAMENTO
// ==========================================

/**
 * Preenche o modal com dados existentes para editar
 */
function prepararEdicao(nomeProduto) {
    const produto = produtos.find(p => p.nome === nomeProduto);
    if (!produto) return;

    // Ajusta o Modal para Modo Edição
    document.querySelector("#modalProduto h2").innerText = "Editar Produto";
    document.getElementById("editandoNomeOriginal").value = produto.nome;

    // Preenche os campos básicos
    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("categoriaProduto").value = produto.categoria;
    document.getElementById("descricaoProduto").value = produto.descricao;
    
    // Trata o Preço: "R$ 3,00/kg" -> 3.00
    const precoNumerico = produto.preco.replace("R$ ", "").split('/')[0].replace(",", ".");
    document.getElementById("precoProduto").value = parseFloat(precoNumerico);
    
    // Trata a Quantidade: "25 kg disponíveis" -> 25
    document.getElementById("quantidadeProduto").value = produto.quantidade.split(" ")[0];

    // Trata a Imagem
    preview.src = produto.img;
    preview.style.display = "block";
    placeholder.style.display = "none";

    abrirModal();
}

/**
 * Função principal para Criar ou Atualizar
 */
function finalizarAcao(statusDesejado) {
    const nomeOriginal = document.getElementById("editandoNomeOriginal").value;
    
    // Coleta dados dos inputs
    const nome = document.getElementById("nomeProduto").value;
    const categoria = document.getElementById("categoriaProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const unidade = document.getElementById("unidadeProduto").value;
    const quantidade = document.getElementById("quantidadeProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;

    // Validação básica
    if (!nome || !preco || !quantidade) {
        exibirNotificacao('exclusao', "Preencha os campos obrigatórios!");
        return;
    }

    // Monta o objeto
    const dadosProduto = {
        nome: nome,
        img: preview.src || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2",
        categoria: categoria,
        descricao: descricao,
        preco: `R$ ${parseFloat(preco).toFixed(2).replace(".", ",")}/${unidade}`,
        quantidade: `${quantidade} ${unidade} disponíveis`,
        status: statusDesejado
    };

    if (nomeOriginal) {
        // Modo Edição: Acha o índice e substitui
        const index = produtos.findIndex(p => p.nome === nomeOriginal);
        if (index !== -1) {
            produtos[index] = dadosProduto;
            exibirNotificacao('edicao', `Produto "${nome}" atualizado!`);
        }
    } else {
        // Modo Cadastro: Adiciona novo
        produtos.push(dadosProduto);
        exibirNotificacao('cadastro', `Produto "${nome}" cadastrado!`);
    }

    renderProdutos(produtos); // Atualiza a lista na tela
    fecharModal();
}

// ==========================================
// UPLOAD DE IMAGEM (DRAG & DROP)
// ==========================================
uploadBox.addEventListener("click", () => inputFile.click());

inputFile.addEventListener("change", (e) => handleFile(e.target.files[0]));

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("drag");
});

uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("drag"));

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("drag");
    const file = e.dataTransfer.files[0];
    inputFile.files = e.dataTransfer.files;
    handleFile(file);
});

function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
        placeholder.style.display = "none";
    };
    reader.readAsDataURL(file);
}