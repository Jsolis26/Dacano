// MENU MOBILE

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if(menuToggle){
    menuToggle.addEventListener('click', () => {
        mobileMenu.style.display = 
            mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// SLIDER

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function showSlide(i){
    if(i >= slide.length) index = 0;
    if(i < 0) index = slide.length - 1;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

if(next){
    next.addEventListener('click', () => {
        index++;
        showSlide(index);
    });
}

if(prev){
    prev.addEventListener('click', () => {
        index--;
        showSlide(index);
    });
}

// Auto slide
setInterval(() => {
    index++;
    showSlide(index);
}, 5000);
