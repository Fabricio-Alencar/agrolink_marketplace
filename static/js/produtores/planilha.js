// ==========================================
// CONTROLE DO MODAL E ESTADOS
// ==========================================

let listaProdutosValidos = [];

function abrirModalPlanilha() {
    document.getElementById("modalPlanilha").classList.add("active");
    limparEstadoDoModal();
}

function fecharModalPlanilha() {
    document.getElementById("modalPlanilha").classList.remove("active");
}

function limparEstadoDoModal() {
    document.getElementById("estadoUpload").classList.add("active");
    document.getElementById("estadoResultado").classList.remove("active");
    
    const campoInput = document.getElementById("inputPlanilha");
    if (campoInput) campoInput.value = "";
    
    listaProdutosValidos = [];
}

// ==========================================
// PROCESSAMENTO DO ARQUIVO EXCEL
// ==========================================

const zonaDrop = document.getElementById("dropZonePlanilha");
const seletorArquivo = document.getElementById("inputPlanilha");

if (zonaDrop) {
    zonaDrop.addEventListener("dragover", (evento) => {
        evento.preventDefault();
        zonaDrop.classList.add("drag-over");
    });

    zonaDrop.addEventListener("dragleave", () => zonaDrop.classList.remove("drag-over"));

    zonaDrop.addEventListener("drop", (evento) => {
        evento.preventDefault();
        zonaDrop.classList.remove("drag-over");
        if (evento.dataTransfer.files.length) processarArquivoExcel(evento.dataTransfer.files[0]);
    });
}

if (seletorArquivo) {
    seletorArquivo.addEventListener("change", (evento) => {
        if (evento.target.files.length) processarArquivoExcel(evento.target.files[0]);
    });
}

function processarArquivoExcel(arquivo) {
    const nomeMinusculo = arquivo.name.toLowerCase();
    if (!nomeMinusculo.endsWith('.xlsx') && !nomeMinusculo.endsWith('.xls')) {
        // Chamando a função de notificação para ERRO
        exibirNotificacao('exclusao', "Erro: Apenas arquivos Excel (.xlsx ou .xls)!");
        return;
    }

    document.getElementById("nomeArquivo").innerText = arquivo.name;
    const leitor = new FileReader();

    leitor.onload = (evento) => {
        const binario = evento.target.result;
        const livroExcel = XLSX.read(binario, { type: 'binary' });
        const nomeDaPrimeiraAba = livroExcel.SheetNames[0];
        const dadosPlanilha = XLSX.utils.sheet_to_json(livroExcel.Sheets[nomeDaPrimeiraAba]);

        const dadosNormalizados = dadosPlanilha.map(linha => {
            const novaLinha = {};
            for (let coluna in linha) {
                const colunaLimpa = coluna.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, '')
                    .replace(/\([^)]*\)/g, '');
                novaLinha[colunaLimpa] = linha[coluna];
            }
            return novaLinha;
        });

        validarDadosDaPlanilha(dadosNormalizados);
    };

    leitor.readAsBinaryString(arquivo);
}

// ==========================================
// VALIDAÇÃO E REGRAS DE NEGÓCIO
// ==========================================

function validarDadosDaPlanilha(produtosRecebidos) {
    let listaDeErrosEncontrados = [];
    listaProdutosValidos = [];
    const categoriasPermitidas = ['fruta', 'frutas', 'legume', 'legumes', 'hortalica', 'hortalicas', 'grao', 'graos'];

    produtosRecebidos.forEach((item, indice) => {
        let errosDesteProduto = [];
        const nomeDoProduto = item.nomedoproduto || item.nome;

        if (!nomeDoProduto) errosDesteProduto.push("Nome do produto é obrigatório");
        
        const categoriaBruta = item.categoria || "";
        const categoriaTratada = categoriaBruta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (!categoriaTratada || !categoriasPermitidas.includes(categoriaTratada)) {
            errosDesteProduto.push("Categoria inválida");
        }

        const precoNumerico = parseFloat(item.precor || item.preco);
        if (isNaN(precoNumerico) || precoNumerico <= 0) errosDesteProduto.push("Preço deve ser maior que zero");
        
        if (!item.unidade) errosDesteProduto.push("Unidade é obrigatória");

        const quantidadeNumerica = parseFloat(item.quantidade);
        if (isNaN(quantidadeNumerica) || quantidadeNumerica <= 0) errosDesteProduto.push("Quantidade inválida");

        if (errosDesteProduto.length > 0) {
            listaDeErrosEncontrados.push({ 
                linhaExcel: indice + 2, 
                nome: nomeDoProduto || "Produto Sem Nome", 
                detalhes: errosDesteProduto 
            });
        } else {
            listaProdutosValidos.push({
                identificadorUnico: indice,
                nome: nomeDoProduto,
                imagem: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500",
                categoria: categoriaBruta,
                descricao: item.descricao || "Nenhuma descrição fornecida.",
                precoFormatado: `R$ ${precoNumerico.toFixed(2).replace('.', ',')}/${item.unidade}`,
                valorQuantidade: quantidadeNumerica,
                siglaUnidade: item.unidade,
                statusPublicacao: "publicado" 
            });
        }
    });

    apresentarResultadosNoModal(listaProdutosValidos.length, listaDeErrosEncontrados);
}

// ==========================================
// INTERFACE E RENDERIZAÇÃO
// ==========================================

function mudarStatusDoProduto(id, novoStatus) {
    const produto = listaProdutosValidos.find(p => p.identificadorUnico === id);
    if (produto) produto.statusPublicacao = novoStatus;
}

function apresentarResultadosNoModal(totalValidos, listaErros) {
    document.getElementById("estadoUpload").classList.remove("active");
    document.getElementById("estadoResultado").classList.add("active");

    document.getElementById("qtdValidos").innerText = totalValidos;
    document.getElementById("qtdErros").innerText = listaErros.length;

    const divErros = document.getElementById("listaErros");
    const divValidos = document.getElementById("listaValidos");
    
    divErros.innerHTML = "";
    divValidos.innerHTML = "";

    // Renderizar Erros
    listaErros.forEach(erro => {
        divErros.innerHTML += `
            <div class="card-erro-planilha">
                <div class="card-erro-header">
                    <h4>${erro.nome} ⚠️</h4>
                    <small>Linha: ${erro.linhaExcel}</small>
                </div>
                <div class="card-erro-motivos">
                    <ul>${erro.detalhes.map(d => `<li>${d}</li>`).join("")}</ul>
                </div>
            </div>`;
    });

    // Renderizar Válidos
    listaProdutosValidos.forEach(p => {
        divValidos.innerHTML += `
            <div class="card-erro-planilha" style="border-color: #00C853; background: #f9fffb; margin-bottom: 12px;">
                <div class="card-erro-header">
                    <h4 style="color: #2e7d32;">${p.nome}</h4>
                    <select onchange="mudarStatusDoProduto(${p.identificadorUnico}, this.value)" style="font-size: 12px;">
                        <option value="publicado">Publicar</option>
                        <option value="rascunho">Rascunho</option>
                    </select>
                </div>
                <div style="font-size: 13px; color: #444; margin-top: 5px;">
                    <p><strong>Quantidade:</strong> ${p.valorQuantidade} ${p.siglaUnidade} | <strong>Preço:</strong> ${p.precoFormatado}</p>
                    <div style="background: #f1f7f2; padding: 6px; border-radius: 4px; margin-top: 5px;">
                        <p style="font-size: 12px; color: #555;">${p.descricao}</p>
                    </div>
                </div>
            </div>`;
    });

    const botaoImportar = document.getElementById("btnConfirmarPlanilha");
    botaoImportar.disabled = totalValidos === 0;
    botaoImportar.innerText = `Importar ${totalValidos} Produtos`;
}

// ==========================================
// IMPORTAÇÃO FINAL (AQUI CHAMA A NOTIFICAÇÃO)
// ==========================================

document.getElementById("btnConfirmarPlanilha").onclick = () => {
    if (listaProdutosValidos.length > 0) {
        listaProdutosValidos.forEach(p => {
            // "produtos" deve ser o array global do seu rendenizar.js
            produtos.push({
                nome: p.nome,
                img: p.imagem,
                categoria: p.categoria,
                descricao: p.descricao,
                preco: p.precoFormatado,
                quantidade: `${p.valorQuantidade} ${p.siglaUnidade} disponíveis`,
                status: p.statusPublicacao
            });
        });

        renderProdutos(produtos); 
        fecharModalPlanilha();
        
        // Chamada da função global que você criou no outro arquivo
        const plural = listaProdutosValidos.length > 1 ? "s" : "";
        exibirNotificacao('cadastro', `${listaProdutosValidos.length} produto${plural} cadastrado${plural} com sucesso!`);
    }
};