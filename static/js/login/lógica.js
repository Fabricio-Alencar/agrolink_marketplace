/**
 * LÓGICA DE LOGIN - AGROCONNECT
 */

// 1. Variável de estado para armazenar o tipo de usuário selecionado
let userType = "produtor";

// 2. Seleção de elementos do DOM para manipulação
const btnProdutor = document.getElementById('btn-produtor');
const btnEstabelecimento = document.getElementById('btn-estabelecimento');
const loginForm = document.getElementById('login-form');

/**
 * FUNCIONALIDADE: Alternância de Perfil (Toggle)
 * Remove a classe 'active' de um botão e adiciona ao outro.
 */
function switchUserType(type) {
    userType = type;

    if (type === 'produtor') {
        btnProdutor.classList.add('active');
        btnEstabelecimento.classList.remove('active');
    } else {
        btnEstabelecimento.classList.add('active');
        btnProdutor.classList.remove('active');
    }
}

// Eventos de clique para os botões de toggle
btnProdutor.addEventListener('click', () => switchUserType('produtor'));
btnEstabelecimento.addEventListener('click', () => switchUserType('estabelecimento'));

/**
 * FUNCIONALIDADE: Submissão do Formulário
 * Captura os dados e o tipo de usuário atual para processamento.
 */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura dos valores dos campos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação de lógica de autenticação
    console.log("--- Tentativa de Login ---");
    console.log("Perfil:", userType);
    console.log("E-mail:", email);
    console.log("Status: Enviando dados para o servidor...");

    // Aqui você integraria com sua API
    alert(`Login solicitado como ${userType.toUpperCase()} para o e-mail: ${email}`);
});