export const DOM = {
    // Textos de exibição
    userName: document.querySelector('.user-name'),
    userRole: document.querySelector('.user-role'),
    aboutText: document.getElementById('about-text'),
    
    // Foto
    uploadZone: document.getElementById('profile-upload-zone'),
    fileInput: document.getElementById('file-input'),
    profileImg: document.getElementById('profile-img'),
    
    // Inputs do Formulário
    inputs: document.querySelectorAll('.form-control'),
    editIcons: document.querySelectorAll('.edit-icon'),
    allEditable: document.querySelectorAll('.form-control, .about-text'),
    
    // Modal de Exclusão
    btnDeleteAcc: document.getElementById('btn-delete-account'),
    modalDelete: document.getElementById('delete-modal'),
    btnCancelDelete: document.getElementById('btn-cancel-delete'),
    btnConfirmDelete: document.getElementById('btn-confirm-delete')
};