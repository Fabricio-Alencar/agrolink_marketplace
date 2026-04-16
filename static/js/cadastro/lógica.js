// Inicializar os ícones do Lucide
lucide.createIcons();

// Estado inicial
let userType = "produtor";

// Elementos
const btnProdutor = document.getElementById('type-produtor');
const btnEstabelecimento = document.getElementById('type-estabelecimento');
const passwordInput = document.getElementById('password');
const btnTogglePassword = document.getElementById('btn-toggle-password');
const registerForm = document.getElementById('register-form');

// 1. Alternância de Tipo de Conta
function setAccountType(type) {
    userType = type;
    if (type === 'produtor') {
        btnProdutor.classList.add('active');
        btnEstabelecimento.classList.remove('active');
    } else {
        btnEstabelecimento.classList.add('active');
        btnProdutor.classList.remove('active');
    }
    console.log("Tipo de conta selecionado:", userType);
}

btnProdutor.addEventListener('click', () => setAccountType('produtor'));
btnEstabelecimento.addEventListener('click', () => setAccountType('estabelecimento'));

// 2. Mostrar/Ocultar Senha
btnTogglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    
    // Trocar o tipo do input
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Atualizar o ícone (Lucide substitui o conteúdo)
    btnTogglePassword.innerHTML = isPassword 
        ? '<i data-lucide="eye-off"></i>' 
        : '<i data-lucide="eye"></i>';
    
    lucide.createIcons(); // Recriar ícones após mudança no DOM
});

// 3. Submissão do Formulário
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        tipo: userType,
        nome: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('phone').value,
        localizacao: document.getElementById('location').value,
        senha: passwordInput.value
    };

    console.log("--- Novo Cadastro Realizado ---");
    console.table(formData);
    
    alert("Conta criada com sucesso! Verifique o console.");
});