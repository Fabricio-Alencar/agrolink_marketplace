/* ============================================================
   RESPONSABILIDADE: Gerenciamento de Dados (MOCK)
   Princípio: Single Source of Truth
   ============================================================ */
let ordersData = [
    {
        id: 1,
        producer: "Sítio Boa Vista",
        product: "Morango",
        status: "Pendente",
        qty: "150 Kg",
        price: "4.80",
        date: "05/07/2025",
        location: "São José dos Campos, São Paulo",
        desc: "150 Kg de morangos selecionados, padrão exportação. Embalados em caixas térmicas para manter a qualidade durante o trajeto até o destino final.",
        img: "https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_640.jpg",
        contacts: { email: "contato@sitioboavista.com", tel: "(11) 5123-4321", cel: "(11) 98765-1234", wpp: "(11) 8764-3621" }
    },
    {
        id: 2,
        producer: "Fazenda Feliz",
        product: "Maçã Fugi",
        status: "Aceito",
        qty: "150 unidades",
        price: "4.00",
        date: "25/07/2024",
        location: "Campinas, SP",
        desc: "Fizemos o pedido de maçã pelo anúncio da plataforma para uso no nosso estabelecimento. Esperamos que as frutas cheguem frescas e em bom estado.",
        img: "https://cdn.pixabay.com/photo/2016/08/12/22/38/apple-1589874_640.jpg",
        contacts: { email: "fazendafeliz@gmail.com", tel: "(11) 5123-4321", cel: "(11) 98765-1234", wpp: "(11) 8764-3621" }
    },
    {
        id: 3,
        producer: "Horta do Vale",
        product: "Alface Crespa",
        status: "Recusado",
        qty: "50 Kg",
        price: "5.20",
        date: "10/08/2025",
        location: "Atibaia, SP",
        desc: "Pedido de hortaliças frescas para reposição semanal. Infelizmente recusado devido à forte geada que comprometeu a colheita desta semana.",
        img: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80",
        contacts: { email: "hortadovale@agro.com", tel: "(11) 5123-4321", cel: "(11) 98765-1234", wpp: "(11) 8764-3621" }
    },
    {
        id: 4,
        producer: "Rancho Solar",
        product: "Milho Verde",
        status: "Pendente",
        qty: "200 espigas",
        price: "1.50",
        date: "12/09/2025",
        location: "Piracicaba, SP",
        desc: "Milho verde doce, colhido no mesmo dia da entrega. Ideal para pamonha e consumo direto.",
        img: "https://www.frutiver.com.br/app/uploads/2022/10/milho-600x600.jpg",
        contacts: { email: "contato@ranchosolar.com.br", tel: "(19) 3455-1122", cel: "(19) 99221-3344", wpp: "(19) 99221-3344" }
    },
    {
        id: 5,
        producer: "Estância Rubi",
        product: "Tomate Cereja",
        status: "Aceito",
        qty: "80 Caixas",
        price: "12.00",
        date: "30/06/2025",
        location: "Itu, SP",
        desc: "Tomates tipo Sweet Grape, altamente doces e sem defensivos químicos agressivos.",
        img: "https://images.unsplash.com/photo-1592924357228-91a4dadbe7c5?auto=format&fit=crop&w=400&q=80",
        contacts: { email: "vendas@estanciarubi.com", tel: "(11) 4022-9988", cel: "(11) 97766-5544", wpp: "(11) 97766-5544" }
    }
];

/* ============================================================
   RESPONSABILIDADE: Renderização de Interface (UI)
   Princípio: Única responsabilidade de transformar dados em HTML
   ============================================================ */
function renderOrders(data) {
    const grid = document.getElementById('orders-grid');
    if (!grid) return;
    grid.innerHTML = ''; 

    data.forEach(order => {
        const statusClass = order.status.toLowerCase();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="producer-name">${order.producer}</div>
                    <div class="product-name">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.19v6.72zm14 0v-6.72l-6 3.39v6.71l6-3.38z"/></svg>
                        ${order.product}
                    </div>
                </div>
                <span class="badge ${statusClass}">${order.status}</span>
            </div>
            <div class="card-body">
                <div class="price-row">
                    <span class="qty">Quantidade<br><strong>${order.qty}</strong></span>
                    <span class="price">Preço<br>R$ ${order.price}/kg</span>
                </div>
                <div class="desc">${order.desc}</div>
                <div class="info-row">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
                    Entrega: ${order.date}
                </div>
                <div class="info-row">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    ${order.location}
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-details" onclick="showDetails(${order.id})">Detalhes</button>
                <button class="btn-delete" onclick="deleteOrder(${order.id})">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ============================================================
   RESPONSABILIDADE: Navegação e Controle de Fluxo (SPA Logic)
   ============================================================ */
function showDetails(id) {
    const order = ordersData.find(o => o.id === id);
    if (!order) return;

    const container = document.getElementById('details-content');
    const statusClass = order.status.toLowerCase();

    container.innerHTML = `
        <div class="details-header">
            <h2>Detalhes do Pedido</h2>
            <span class="badge ${statusClass}" style="font-size: 14px; padding: 6px 16px;">${order.status}</span>
        </div>
        <div class="details-grid">
            <div class="col-left">
                <div class="info-group">
                    <span class="info-label">📦 Produto:</span>
                    <span class="info-value">${order.product}</span>
                </div>
                <div style="display:flex; gap:40px; margin-bottom:24px;">
                    <div>
                        <span class="info-label">Quantidade:</span>
                        <span class="info-text">${order.qty}</span>
                    </div>
                    <div>
                        <span class="info-label">Preço:</span>
                        <span class="info-text">R$ ${order.price}/unidade</span>
                    </div>
                </div>
                <div class="info-group">
                    <span class="info-label">📅 Data de entrega:</span>
                    <span class="info-text">${order.date}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">Descrição do Pedido:</span>
                    <textarea class="desc-box" readonly>${order.desc}</textarea>
                </div>
            </div>
            
            <div class="col-right">
                <img src="${order.img}" alt="${order.product}" class="product-img">
                <div class="info-group">
                    <span class="info-label">🤝 Negociante:</span>
                    <span class="info-value" style="font-size:18px; color: var(--primary)">${order.producer}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">📍 Localização:</span>
                    <span class="info-text">${order.location}</span>
                </div>
                <div class="info-group">
                    <span class="info-label">👤 Contatos:</span>
                    <ul class="contact-list">
                        <li><strong>Email:</strong> <span>${order.contacts.email}</span></li>
                        <li><strong>Telefone:</strong> <span>${order.contacts.tel}</span></li>
                        <li><strong>Celular:</strong> <span>${order.contacts.cel}</span></li>
                        <li><strong>Whatsapp:</strong> <span>${order.contacts.wpp}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="action-buttons">
            <button class="btn-action btn-finalize">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                Finalizar Pedido
            </button>
            <button class="btn-action btn-cancel">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                Cancelar Pedido
            </button>
        </div>
    `;

    document.getElementById('view-lista').style.display = 'none';
    document.getElementById('view-detalhes').style.display = 'block';
    window.scrollTo(0, 0); 
}

function hideDetails() {
    document.getElementById('view-detalhes').style.display = 'none';
    document.getElementById('view-lista').style.display = 'block';
}

/* ============================================================
   RESPONSABILIDADE: Filtros, Busca e Manipulação de Dados
   Princípio: Separação de Lógica de Negócio e Visual
   ============================================================ */
function deleteOrder(id) {
    if(confirm("Tem certeza que deseja excluir este pedido?")) {
        ordersData = ordersData.filter(order => order.id !== id);
        applyFilters(); 
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusTerm = document.getElementById('statusFilter').value;

    const filtered = ordersData.filter(order => {
        const matchesSearch = order.product.toLowerCase().includes(searchTerm) || 
                              order.producer.toLowerCase().includes(searchTerm);
        const matchesStatus = statusTerm === 'Todos' || order.status === statusTerm;
        return matchesSearch && matchesStatus;
    });

    renderOrders(filtered);
}

// Event Listeners (Controladores)
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('statusFilter').addEventListener('change', applyFilters);

// Inicialização
window.onload = () => renderOrders(ordersData);