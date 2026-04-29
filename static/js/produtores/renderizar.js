/**
 * ARQUIVO: renderizar.js
 * OBJETIVO: 
 * - Renderizar os produtos do produtor na tela de forma otimizada.
 * - Implementa busca com debounce para evitar sobrecarga de requisições.
 */

async function renderProdutos(listaParaRenderizar) {
    // =========================
    // BUSCA DADOS (API ou lista filtrada)
    // =========================
    // Se 'listaParaRenderizar' for nulo/vazio, chama a função assíncrona da API
    const lista = listaParaRenderizar || await API.meusProdutos();
    const container = document.getElementById("produtosContainer");
    
    /**
     * 🛡️ VERIFICAÇÃO 1: Fallback de segurança (DOM)
     * Impede que o código quebre se o script for executado em uma página 
     * que não possua o elemento 'produtosContainer'. Se não existir, sai da função.
     */
    if (!container) return;

    /**
     * 🛡️ VERIFICAÇÃO 2: Validação de Tipo (Integridade de Dados)
     * O método .map() abaixo exige que 'lista' seja um Array. Se a API retornar 
     * um erro ou dado inválido, esta trava evita o erro ".map is not a function" 
     * e exibe uma mensagem amigável ao usuário.
     */
    if (!Array.isArray(lista)) {
        container.innerHTML = '<p class="sem-resultados">Erro ao carregar produtos</p>';
        return;
    }


// Objeto de tradução para unidades e categorias
const dicionarioTraducao = {
    // --- UNIDADES DE PESO ---
    "kg": "quilograma",
    "g": "grama",
    "arroba": "arroba",
    "t": "tonelada",

    // --- UNIDADES DE QUANTIDADE ---
    "unidade": "unidade",
    "duzia": "dúzia",
    "cento": "cento",
    "milheiro": "milheiro",

    // --- EMBALAGENS E VOLUMES ---
    "caixa": "caixa",
    "saca": "saca",
    "maco": "maço",
    "bandeja": "bandeja",
    "litro": "litro",

    // --- CATEGORIAS ---
    "frutas": "Frutas",
    "legumes": "Legumes",
    "hortalicas": "Hortaliças",
    "graos": "Grãos e Cereais",
    "oleaginosas": "Oleaginosas e Sementes",
    "ervas": "Ervas e Temperos",
    "outros": "Outros"
    };

function formatarLabel(valor) {
        if (!valor) return "Não informado";
        
        // Se o valor existir no dicionário, retorna o traduzido. 
        // Se não existir, retorna o valor original com a primeira letra maiúscula.
        return dicionarioTraducao[valor.toLowerCase()] || valor.charAt(0).toUpperCase() + valor.slice(1);
    }

    // =========================
    // MONTAGEM DE HTML EM LOTE
    // =========================
    // .map() percorre cada produto e transforma em uma string de HTML
    const htmlCards = lista.map(produto => {

        // Transformamos o objeto 'produto' em uma string segura para o atributo HTML
        const produtoJSON = JSON.stringify(produto).replace(/'/g, "&apos;");
        
        // Se não houver foto, utiliza uma imagem padrão
        const caminhoFoto = produto.foto 
            ? (produto.foto.startsWith('http') ? produto.foto : `../static/${produto.foto}`)
            : "../static/uploads/produtos/foto_generica.png";

        // 💰 Formatação de Preço: Converte número (ex: 10.5) para Moeda Real (ex: R$ 10,50)
        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(produto.preco || 0);

        // Retorna a estrutura visual do card (Template String)
        return `
            <div class="produtor-card">
                <div class="status ${produto.status || ''}">
                    <img src="../static/assets/${produto.status}.png" class="status-icon">
                    <span>${produto.status || 'indefinido'}</span>
                </div>
                
                <div class="card-image-container">
                    <img src="${caminhoFoto}" alt="${produto.nome}" loading="lazy" onerror="this.src='../static/upload/produtos/foto_generica.png'">
                </div>
                
                <div class="produtor-info">
                    <h2>${produto.nome}</h2>

                    <span class="categoria ${produto.categoria || 'geral'}">
                        ${formatarLabel(produto.categoria)}
                    </span>

                    <p class="descricao">
                        ${produto.descricao || 'Sem descrição disponível.'}
                    </p>

                    <strong class="preco">
                        ${precoFormatado} /${formatarLabel(produto.unidade)}
                    </strong>

                    <p class="quantidade">
                        Disponível: ${produto.quantidade || 0} ${formatarLabel(produto.unidade) || 'un'}(s)
                    </p>

                    <div class="botoes-card">
                        <button class="editar-card-btn" onclick='prepararEdicao(${produtoJSON})'>
                            <i data-lucide="square-pen"></i>            
                            <span>Editar</span>
                        </button>

                        <button class="excluir-card-btn" title="Excluir Produto" onclick="prepararExclusao(${produto.id}, '${produto.nome}')">
                        </button>
                    </div>
                </div>
            </div>`;
    }).join(''); // .join('') transforma o array de strings em uma única string gigante

    // RENDER FINAL: Injeta todo o HTML gerado de uma só vez no container para evitar repaints excessivos
    container.innerHTML = htmlCards || '<p class="sem-resultados">Nenhum produto encontrado.</p>';

    if (window.lucide) {
        lucide.createIcons();
    }
}

// ==========================================
// FILTRO DE BUSCA COM DEBOUNCE
// ==========================================
let debounceTimer;
const searchInput = document.getElementById("searchInput");

/**
 * O Debounce evita que a busca seja disparada a cada tecla pressionada.
 * Ele espera 300ms de silêncio (sem digitar) antes de processar a filtragem.
 */

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        // Cancela o timer anterior para reiniciar a contagem
        clearTimeout(debounceTimer);
        
        // Define um novo timer
        debounceTimer = setTimeout(async () => {
            const termoBusca = e.target.value.toLowerCase().trim();
            const todosProdutos = await API.meusProdutos();

            // Filtra a lista comparando o termo digitado com Nome ou Categoria
            const filtrados = todosProdutos.filter(p => 
                (p.nome && p.nome.toLowerCase().includes(termoBusca)) || 
                (p.categoria && p.categoria.toLowerCase().includes(termoBusca))
            );

            // Re-renderiza a tela apenas com os itens que passaram no filtro
            renderProdutos(filtrados);
        }, 300);
    });
}

// INICIALIZAÇÃO: Dispara a primeira carga de produtos assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    renderProdutos();
});
