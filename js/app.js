// MENU MOBILE

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if(menuToggle){
    menuToggle.addEventListener('click', () => {
        mobileMenu.style.display =
            mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// BUSCADOR OVERLAY

const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');

if(searchToggle){
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.toggle('active');
    });
}

if(searchOverlay){
    searchOverlay.addEventListener('click', (e) => {
        if(e.target === searchOverlay){
            searchOverlay.classList.remove('active');
        }
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

setInterval(() => {
    index++;
    showSlide(index);
}, 5000);

// CARGAR PRODUCTOS DESTACADOS

fetch('data/productos.json')
.then(res => res.json())
.then(productos => {

    const destacadosContainer = document.getElementById('destacados-container');

    if(destacadosContainer){
        const destacados = productos.filter(p => p.destacado === true).slice(0,5);

        destacados.forEach(producto => {
            destacadosContainer.innerHTML += `
                <div class="destacado-card" onclick="window.location.href='producto.html?id=${producto.id}'">
                    <img src="${producto.imagen}">
                    <h3>${producto.nombre}</h3>
                </div>
            `;
        });
    }

});

// BUSCADOR GLOBAL FUNCIONAL

const globalSearch = document.getElementById('globalSearch');

if(globalSearch){
    globalSearch.addEventListener('keypress', function(e){
        if(e.key === "Enter"){
            const termino = globalSearch.value.trim();
            if(termino !== ""){
                window.location.href = `catalogo.html?search=${encodeURIComponent(termino)}`;
            }
        }
    });
}

