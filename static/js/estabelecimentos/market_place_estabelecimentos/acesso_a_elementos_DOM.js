// ===============================
// 2. DOM (Responsável apenas por acessar elementos)
// ===============================
export const DOM = {
    grid: document.getElementById('productsGrid'),
    resultsCount: document.getElementById('resultsCount'),
    searchInput: document.getElementById('searchInput'),
    filterCat: document.getElementById('filterCategory'),
    filterState: document.getElementById('filterState'),
    filterCity: document.getElementById('filterCity'),
    filterDist: document.getElementById('filterDistance'),
    distLabel: document.getElementById('distLabel'),
    modal: document.getElementById('orderModal'),
    inputQtd: document.getElementById('inputQtd'),
    inputData: document.getElementById('inputData'),
    inputDesc: document.getElementById('inputDesc'),
    menuBtn: document.querySelector('.menu-icon'),
    drawerOverlay: document.getElementById('drawerOverlay'),
    sideDrawer: document.getElementById('sideDrawer'),
    closeDrawerBtn: document.getElementById('closeDrawerBtn')
};

let produtoSelecionado = null;

export function setProdutoSelecionado(prod) {
    produtoSelecionado = prod;
}

export function getProdutoSelecionado() {
    return produtoSelecionado;
}
