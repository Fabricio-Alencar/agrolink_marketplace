/**
 * SISTEMA GLOBAL DE NOTIFICAÇÕES (TOAST)
 * @param {string} tipo - 'cadastro' (verde), 'edicao' (azul), 'exclusao' (vermelho)
 * @param {string} mensagem - Texto da mensagem
 */
function exibirNotificacao(tipo, mensagem) {
    // Procura o container ou cria um se não existir
    let container = document.getElementById("toast-container");
    
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const notificacao = document.createElement("div");
    
    let caminhoIcone = "";
    let classeEstilo = "";

    // Definição de cores e ícones (Imagem à ESQUERDA)
    switch (tipo) {
        case 'planilha':
            caminhoIcone = "../static/assets/excel.png";
            classeEstilo = "notificacao-planilha";
            break;
        case 'cadastro':
            caminhoIcone = "../static/assets/produto_cadastrado.png";
            classeEstilo = "notificacao-sucesso";
            break;
        case 'edicao':
            caminhoIcone = "../static/assets/produto_editado.png";
            classeEstilo = "notificacao-edicao";
            break;
        case 'exclusao':
            caminhoIcone = "../static/assets/produto_excluido.png";
            classeEstilo = "notificacao-exclusao";
            break;
        default:
            caminhoIcone = "../static/assets/produto_cadastrado.png";
            classeEstilo = "notificacao-sucesso";
    }

    notificacao.className = `notificacao-base ${classeEstilo}`;
    notificacao.innerHTML = `
        <img src="${caminhoIcone}" class="notificacao-icone" alt="ícone">
        <span class="notificacao-texto">${mensagem}</span>
    `;

    container.appendChild(notificacao);

    // Auto-remover após 3.5 segundos
    setTimeout(() => {
        notificacao.classList.add("saindo");
        setTimeout(() => notificacao.remove(), 500);
    }, 7000);
}