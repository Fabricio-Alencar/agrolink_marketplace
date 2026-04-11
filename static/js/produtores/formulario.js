function abrirModal() {
    document.getElementById("modalProduto").classList.add("active");
}

function fecharModal() {
    document.getElementById("modalProduto").classList.remove("active");
}

// elementos
const uploadBox = document.getElementById("uploadBox");
const inputFile = document.getElementById("fotoProduto");

// cria placeholder dinamicamente
const placeholder = document.createElement("div");
placeholder.classList.add("upload-placeholder");
placeholder.innerHTML = `
    <img src="../static/assets/upload.png">
    <p>Arraste ou clique para selecionar</p>
`;

uploadBox.appendChild(placeholder);

// preview image
const preview = document.createElement("img");
preview.classList.add("upload-preview");
uploadBox.appendChild(preview);

// clique abre input
uploadBox.addEventListener("click", () => inputFile.click());

// input change
inputFile.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
});

// drag & drop
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("drag");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("drag");
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("drag");

    const file = e.dataTransfer.files[0];
    inputFile.files = e.dataTransfer.files;

    handleFile(file);
});

// função principal
function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
        placeholder.style.display = "none";
    };

    reader.readAsDataURL(file);
}