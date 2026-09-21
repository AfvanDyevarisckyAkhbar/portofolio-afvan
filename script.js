// 1. Mobile Menu Toggle
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-item a');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Otomatis tutup menu mobile ketika salah satu link navigasi diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Body Dark Mode
const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const btnBukaModal = document.querySelector('#btnKontak');
const elemenModal = document.querySelector('#modalKontak');
const btnTutupModal = document.querySelector('#btnTutupModal');

btnBukaModal.addEventListener('click', function(event) {  
    event.preventDefault();
    elemenModal.classList.add('show');
}); 

btnTutupModal.addEventListener('click', function() {
    elemenModal.classList.remove('show');
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (elemenModal.classList.contains('show')) {
            elemenModal.classList.remove('show');
            console.log('modal ditutup menggunakan tombol ESC');
        }
    }
});