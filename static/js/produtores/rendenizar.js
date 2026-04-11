// =========================
// BANCO DE DADOS (FAKE API)
// =========================
const produtos = [
    {
        nome: "Laranja",
        img: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b",
        categoria: "fruta",
        descricao: "Laranja fresca, doce e rica em vitamina C.",
        preco: "R$ 3,00/kg",
        quantidade: "25 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Banana",
        img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
        categoria: "fruta",
        descricao: "Banana madura, ideal para consumo diário.",
        preco: "R$ 4,50/kg",
        quantidade: "30 kg disponíveis",
        status: "rascunho"
    },
    {
        nome: "Tomate",
        img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
        categoria: "legume",
        descricao: "Tomates frescos para saladas e molhos.",
        preco: "R$ 5,00/kg",
        quantidade: "18 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Maçã",
        img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
        categoria: "fruta",
        descricao: "Maçãs vermelhas crocantes e doces.",
        preco: "R$ 6,00/kg",
        quantidade: "40 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Manga",
        img: "https://images.unsplash.com/photo-1553279768-865429fa0078",
        categoria: "fruta",
        descricao: "Manga madura e suculenta direto do pomar.",
        preco: "R$ 5,50/kg",
        quantidade: "22 kg disponíveis",
        status: "rascunho"
    },
    {
        nome: "Batata",
        img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
        categoria: "legume",
        descricao: "Batatas frescas ideais para fritar ou cozinhar.",
        preco: "R$ 3,20/kg",
        quantidade: "60 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Cebola",
        img: "https://images.unsplash.com/photo-1508747703725-719777637510",
        categoria: "legume",
        descricao: "Cebolas fortes e frescas para temperos.",
        preco: "R$ 4,00/kg",
        quantidade: "35 kg disponíveis",
        status: "rascunho"
    },
    {
        nome: "Alface",
        img: "https://images.unsplash.com/photo-1557844352-761f2565b576",
        categoria: "hortalica",
        descricao: "Alface fresca, crocante e orgânica.",
        preco: "R$ 2,00/unidade",
        quantidade: "50 unidades",
        status: "publicado"
    },
    {
        nome: "Cenoura",
        img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
        categoria: "legume",
        descricao: "Cenouras ricas em vitamina A e frescor.",
        preco: "R$ 3,80/kg",
        quantidade: "20 kg disponíveis",
        status: "rascunho"
    },
    {
        nome: "Morango",
        img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6",
        categoria: "fruta",
        descricao: "Morangos doces e frescos direto do produtor.",
        preco: "R$ 8,00/kg",
        quantidade: "10 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Uva",
        img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f",
        categoria: "fruta",
        descricao: "Uvas roxas doces e sem sementes.",
        preco: "R$ 7,50/kg",
        quantidade: "18 kg disponíveis",
        status: "publicado"
    },
    {
        nome: "Pepino",
        img: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
        categoria: "legume",
        descricao: "Pepinos frescos e crocantes para saladas.",
        preco: "R$ 2,80/kg",
        quantidade: "28 kg disponíveis",
        status: "rascunho"
    }
];


// =========================
// ELEMENTOS DOM
// =========================
const container = document.getElementById("produtosContainer");
const input = document.getElementById("searchInput");


// =========================
// FUNÇÃO RENDER
// =========================
function renderProdutos(lista) {

    container.innerHTML = "";

    lista.forEach(produto => {

        const iconeStatus = produto.status === "publicado"
            ? "../static/assets/publicado.png"
            : "../static/assets/rascunho.png";

        const textoStatus = produto.status === "publicado"
            ? "Publicado"
            : "Rascunho";

        container.innerHTML += `
        <div class="produtor-card">

            <!-- STATUS -->
            <div class="status ${produto.status}">
                <img src="${iconeStatus}" alt="${produto.status}">
                <span>${textoStatus}</span>
            </div>

            <img src="${produto.img}" alt="${produto.nome}">

            <div class="produtor-info">

                <h2>${produto.nome}</h2>

                <!-- categoria normalizada para CSS + exibida bonita -->
                <span class="categoria ${produto.categoria.toLowerCase()}">
                    ${produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}
                </span>

                <p class="descricao">${produto.descricao}</p>

                <strong class="preco">${produto.preco}</strong>

                <p class="quantidade">${produto.quantidade}</p>

                <div class="botoes-card">
                    <button class="editar-card-btn">
                        <img src="../static/assets/editar.png" alt="">
                        <span>Editar</span>
                    </button>

                    <button class="excluir-card-btn" onclick="prepararExclusao('${produto.nome}')"></button>
                </div>

            </div>
        </div>
        `;
    });
}


// =========================
// BUSCA EM TEMPO REAL
// =========================
input.addEventListener("input", (e) => {

    const valor = e.target.value.toLowerCase();

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(valor)
    );

    renderProdutos(filtrados);
});


// =========================
// INICIALIZAÇÃO
// =========================
renderProdutos(produtos);