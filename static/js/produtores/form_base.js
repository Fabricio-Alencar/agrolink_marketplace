/**
 * ARQUIVO: form_base.js
 * OBJETIVO: Centralizar elementos, upload de imagem, FormData e Maestro.
 */

const uploadBox = document.getElementById("uploadBox");
const inputFile = document.getElementById("fotoProduto");

// --- CONFIGURAÇÃO VISUAL DO UPLOAD ---
const placeholder = document.createElement("div");
placeholder.classList.add("upload-placeholder");
placeholder.innerHTML = `<img src="../static/assets/upload.png"><p>Selecione sua imagem</p>`;

const preview = document.createElement("img");
preview.classList.add("upload-preview");
preview.style.display = "none";

uploadBox.appendChild(placeholder);
uploadBox.appendChild(preview);

/**
 * CAPTURA DE DADOS
 * Organiza os campos em um FormData para suportar envio de arquivos.
 */
function obterDadosFormulario(statusDesejado) {
    const nome = document.getElementById("nomeProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const quantidade = document.getElementById("quantidadeProduto").value;

    if (!nome || !preco || quantidade === "") {
        exibirNotificacao('exclusao', "Preencha o nome, preço e quantidade!");
        return null;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('quantidade', quantidade || 0);
    formData.append('unidade', document.getElementById("unidadeProduto").value);
    formData.append('categoria', document.getElementById("categoriaProduto").value);
    formData.append('descricao', document.getElementById("descricaoProduto").value);
    formData.append('status', statusDesejado);

    const arquivoFoto = inputFile.files[0];
    if (arquivoFoto) {
        formData.append('foto', arquivoFoto); 
    }

    return formData;
}

/**
 * MAESTRO: Decide entre Criar ou Editar.
 */
function finalizarAcao(statusDesejado) {
    const idParaEditar = document.getElementById("editandoNomeOriginal").value;
    const dados = obterDadosFormulario(statusDesejado);
    
    if (dados) {
        if (idParaEditar) {
            executarEdicao(dados);
        } else {
            executarCriacao(dados);
        }
    }
}

/**
 * LIMPEZA: Reseta o modal para o estado original.
 */
function fecharModal() {
    document.getElementById("modalProduto").classList.remove("active");
    
    // Reset de Texto e IDs
    document.getElementById("editandoNomeOriginal").value = "";
    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
    document.getElementById("descricaoProduto").value = "";
    
    // Reset de Selects
    document.getElementById("categoriaProduto").selectedIndex = 0;
    document.getElementById("unidadeProduto").selectedIndex = 0;

    // Reset de Foto
    inputFile.value = ""; 
    preview.src = "";
    preview.style.display = "none";
    placeholder.style.display = "block";

    // Sincroniza os labels após o reset
    atualizarLabelsUnidade();
}

// --- LÓGICA DE UPLOAD ---
uploadBox.addEventListener("click", () => inputFile.click());

inputFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
            preview.src = event.target.result;
            preview.style.display = "block";
            placeholder.style.display = "none";
        }; 
        reader.readAsDataURL(file);
    }
});

// --- UX: ATUALIZAÇÃO DINÂMICA DE UNIDADE ---
const selectUnidade = document.getElementById("unidadeProduto");
const labelPreco = document.getElementById("labelPreco");
const labelQuantidade = document.getElementById("labelQuantidade");

function atualizarLabelsUnidade() {
    if (!selectUnidade || !labelPreco || !labelQuantidade) return;

    const unidadeSelecionada = selectUnidade.options[selectUnidade.selectedIndex].text;
    
    labelPreco.innerHTML = `Preço por <strong>${unidadeSelecionada}</strong> (R$)`;
    labelQuantidade.innerHTML = `Estoque Disponível (em <strong>${unidadeSelecionada}</strong>)`;
}

if (selectUnidade) {
    selectUnidade.addEventListener("change", atualizarLabelsUnidade);
}

// Inicializa os labels no carregamento
atualizarLabelsUnidade();
