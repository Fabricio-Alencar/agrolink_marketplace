// ==========================================
// CONTROLE DO MODAL E ESTADOS DA PLANILHA
// ==========================================

function abrirModalPlanilha() {
    document.getElementById("modalPlanilha").classList.add("active");
    resetarModalPlanilha();
}

function fecharModalPlanilha() {
    document.getElementById("modalPlanilha").classList.remove("active");
}

function resetarModalPlanilha() {
    document.getElementById("estadoUpload").classList.add("active");
    document.getElementById("estadoResultado").classList.remove("active");
    document.getElementById("inputPlanilha").value = "";
    produtosValidosGlobais = [];
}

// ==========================================
// DRAG & DROP E PROCESSAMENTO DO EXCEL
// ==========================================

const dropZone = document.getElementById("dropZonePlanilha");
const inputPlanilha = document.getElementById("inputPlanilha");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    if (e.dataTransfer.files.length) processarArquivo(e.dataTransfer.files[0]);
});

inputPlanilha.addEventListener("change", (e) => {
    if (e.target.files.length) processarArquivo(e.target.files[0]);
});

function processarArquivo(file) {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert("Por favor, envie um arquivo Excel (.xlsx ou .xls)");
        return;
    }

    document.getElementById("nomeArquivo").innerText = file.name;
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const primeiraAba = workbook.SheetNames[0];
        const dadosBrutos = XLSX.utils.sheet_to_json(workbook.Sheets[primeiraAba]);

        // NORMALIZAÇÃO: Limpa os cabeçalhos (remove acentos, espaços e parênteses)
        const produtosNormalizados = dadosBrutos.map(item => {
            const novoItem = {};
            for (let chave in item) {
                const chaveLimpa = chave.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
                    .replace(/\s+/g, '') 
                    .replace(/\([^)]*\)/g, ''); 
                novoItem[chaveLimpa] = item[chave];
            }
            return novoItem;
        });

        validarProdutos(produtosNormalizados);
    };

    reader.readAsBinaryString(file);
}

// ==========================================
// VALIDAÇÃO E REGRAS DE NEGÓCIO
// ==========================================

let produtosValidosGlobais = [];

function validarProdutos(produtosPlanilha) {
    let listaErros = [];
    produtosValidosGlobais = [];

    const catPermitidas = ['fruta', 'frutas', 'legume', 'legumes', 'hortalica', 'hortalicas', 'grao', 'graos'];

    produtosPlanilha.forEach((produto, index) => {
        let errosDoProduto = [];
        const nome = produto.nomedoproduto || produto.nome;

        if (!nome) errosDoProduto.push("Nome do produto é obrigatório");
        
        const catOriginal = produto.categoria || "";
        const catLimpa = catOriginal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!catLimpa || !catPermitidas.includes(catLimpa)) {
            errosDoProduto.push("Categoria inválida (Use: Frutas, Legumes, Hortaliças ou Grãos)");
        }

        const precoNum = parseFloat(produto.precor || produto.preco);
        if (isNaN(precoNum) || precoNum <= 0) errosDoProduto.push("Preço deve ser maior que zero");
        
        if (!produto.unidade) errosDoProduto.push("Unidade é obrigatória");

        const qtdNum = parseFloat(produto.quantidade);
        if (isNaN(qtdNum) || qtdNum <= 0) errosDoProduto.push("Quantidade deve ser maior que zero");

        if (errosDoProduto.length > 0) {
            listaErros.push({ linha: index + 2, nome: nome || "Sem nome", erros: errosDoProduto });
        } else {
            // Descrição não é obrigatória para validar, mas capturamos se existir
            const descricaoFinal = produto.descricao || "Sem descrição informada.";

            produtosValidosGlobais.push({
                idTemp: index,
                nome: nome,
                img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500",
                categoria: catOriginal,
                descricao: descricaoFinal,
                preco: `R$ ${precoNum.toFixed(2).replace('.', ',')}/${produto.unidade}`,
                quantidadeValor: produto.quantidade, // guardamos o valor puro
                unidade: produto.unidade,            // guardamos a unidade pura
                status: "publicado" 
            });
        }
    });

    renderizarResultados(produtosValidosGlobais.length, listaErros);
}

// ==========================================
// INTERFACE E RENDERIZAÇÃO
// ==========================================

function alterarStatusIndividual(id, novoStatus) {
    const p = produtosValidosGlobais.find(item => item.idTemp === id);
    if (p) p.status = novoStatus;
}

function renderizarResultados(qtdValidos, listaErros) {
    document.getElementById("estadoUpload").classList.remove("active");
    document.getElementById("estadoResultado").classList.add("active");

    document.getElementById("qtdValidos").innerText = qtdValidos;
    document.getElementById("qtdErros").innerText = listaErros.length;

    const containerErros = document.getElementById("listaErros");
    const containerValidos = document.getElementById("listaValidos");
    containerErros.innerHTML = "";
    containerValidos.innerHTML = "";

    // Renderizar Cards de Erro
    listaErros.forEach(item => {
        containerErros.innerHTML += `
            <div class="card-erro-planilha">
                <div class="card-erro-header">
                    <h4>${item.nome} ⚠️</h4>
                    <small>Linha: ${item.linha}</small>
                </div>
                <div class="card-erro-motivos">
                    <ul>${item.erros.map(e => `<li>${e}</li>`).join("")}</ul>
                </div>
            </div>`;
    });

    // Renderizar Cards Válidos
    produtosValidosGlobais.forEach(p => {
        containerValidos.innerHTML += `
            <div class="card-erro-planilha" style="border-color: #00C853; background: #f9fffb; margin-bottom: 12px;">
                <div class="card-erro-header">
                    <h4 style="color: #2e7d32; margin: 0;">${p.nome}</h4>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <label style="font-size: 11px; font-weight: 600;">Ação:</label>
                        <select onchange="alterarStatusIndividual(${p.idTemp}, this.value)" style="padding: 2px; border-radius: 4px; border: 1px solid #ccc; font-size: 12px;">
                            <option value="publicado">Publicar</option>
                            <option value="rascunho">Rascunho</option>
                        </select>
                    </div>
                </div>
                
                <div style="margin: 8px 0; font-size: 13px; color: #444;">
                    <p><strong>Categoria:</strong> ${p.categoria}</p>
                    <p><strong>Preço:</strong> ${p.preco}</p>
                    <p><strong>Quantidade:</strong> ${p.quantidadeValor} ${p.unidade}</p>
                </div>

                <div style="background: #f1f7f2; padding: 8px; border-radius: 4px; margin-top: 5px;">
                    <p style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 3px; text-transform: uppercase;">Descrição:</p>
                    <p style="font-size: 12px; color: #555; line-height: 1.4;">${p.descricao}</p>
                </div>
            </div>`;
    });

    const btnConfirmar = document.getElementById("btnConfirmarPlanilha");
    btnConfirmar.disabled = qtdValidos === 0;
    btnConfirmar.innerText = `Importar ${qtdValidos} Produtos`;
}

// ==========================================
// IMPORTAÇÃO FINAL (BOTÃO CONFIRMAR)
// ==========================================

document.getElementById("btnConfirmarPlanilha").onclick = () => {
    if (produtosValidosGlobais.length > 0) {
        produtosValidosGlobais.forEach(p => {
            // Adaptando o objeto para o formato que seu card usa no 'rendenizar.js'
            produtos.push({
                nome: p.nome,
                img: p.img,
                categoria: p.categoria,
                descricao: p.descricao,
                preco: p.preco,
                quantidade: `${p.quantidadeValor} ${p.unidade} disponíveis`,
                status: p.status
            });
        });

        renderProdutos(produtos); // Função global do rendenizar.js
        fecharModalPlanilha();
        alert(`${produtosValidosGlobais.length} produtos importados com sucesso!`);
    }
};