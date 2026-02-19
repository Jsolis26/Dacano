document.addEventListener("DOMContentLoaded", function(){

// ================= MENU MOBILE =================

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if(menuToggle){
    menuToggle.addEventListener('click', () => {
        mobileMenu.style.display =
            mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ================= BUSCADOR OVERLAY =================

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

// ================= SLIDER =================

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;

function showSlide(i){
    if(!slides) return;
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

if(slides){
    setInterval(() => {
        index++;
        showSlide(index);
    }, 5000);
}

// ================= CARGAR DATOS =================

fetch('data/productos.json')
.then(res => res.json())
.then(productos => {
    productosGlobales = productos;

    // ===== DESTACADOS (HOME) =====

    const destacadosContainer = document.getElementById('destacados-container');

    if(destacadosContainer){
        const destacados = productos.filter(p => p.destacado === true).slice(0,5);

        destacados.forEach(producto => {
            destacadosContainer.innerHTML += `
                <div class="destacado-card"
                onclick="window.location.href='producto.html?id=${producto.id}'">
                    <img src="${producto.imagen}">
                    <h3>${producto.nombre}</h3>
                </div>
            `;
        });
    }

    // ===== TODOS LOS PRODUCTOS (HOME) =====

const todosContainer = document.getElementById('todos-container');

if(todosContainer){
    mostrarProductos(productos, todosContainer);
}

    // ===== CATALOGO =====

    const container = document.getElementById('productos-container');

    if(container){

        const params = new URLSearchParams(window.location.search);
        const searchParam = params.get('search');

        let productosAMostrar = productos;

        if(searchParam){
            productosAMostrar = productos.filter(p =>
                p.nombre.toLowerCase().includes(searchParam.toLowerCase())
            );
        }

        mostrarProductos(productosAMostrar, container);

        const buscador = document.getElementById('buscador');
        if(buscador){
            buscador.addEventListener('keyup', e => {
                const texto = e.target.value.toLowerCase();
                const filtrados = productos.filter(p =>
                    p.nombre.toLowerCase().includes(texto)
                );
                mostrarProductos(filtrados, container);
            });
        }
    }

    // ===== PRODUCTO INDIVIDUAL =====

    const detalle = document.getElementById('detalle-producto');

    if(detalle){

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        const producto = productos.find(p => p.id === id);

        if(producto){
            detalle.innerHTML = `
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" style="width:100%;max-width:400px;">
                <p>${producto.descripcion}</p>
                <h3>Especificaciones</h3>
                <ul>
                    ${producto.especificaciones.map(e => `<li>${e}</li>`).join('')}
                </ul>
                <a class="btn" target="_blank"
                href="https://wa.me/50688888888?text=Hola quiero cotizar ${producto.nombre}">
                Solicitar cotización
                </a>
            `;
        }
    }

});

// ================= BUSCADOR GLOBAL =================

const globalSearch = document.getElementById('globalSearch');

if(globalSearch){
    globalSearch.addEventListener('keypress', function(e){
        if(e.key === "Enter"){
            const termino = globalSearch.value.trim();
            if(termino !== ""){
                window.location.href =
                `catalogo.html?search=${encodeURIComponent(termino)}`;
            }
        }
    });
}

// ================= FUNCION CATALOGO =================

function mostrarProductos(productos, container, pagina = 1){

    const productosPorPagina = 15;
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosPaginados = productos.slice(inicio, fin);

    container.innerHTML = "";

    productosPaginados.forEach(producto => {
        container.innerHTML += `
            <div class="destacado-card producto-card"
            onclick="window.location.href='producto.html?id=${producto.id}'">
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            </div>
        `;
    });

    generarPaginacion(productos.length, productosPorPagina, pagina, container.id);
}

function generarPaginacion(totalProductos, productosPorPagina, paginaActual, containerId){

    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    let paginacionHTML = `<div class="paginacion">`;

    for(let i = 1; i <= totalPaginas; i++){
        paginacionHTML += `
            <span class="pagina-btn ${i === paginaActual ? 'activa' : ''}"
            onclick="cambiarPagina(${i}, '${containerId}')">
            ${i}
            </span>
        `;
    }

    paginacionHTML += `</div>`;

    const container = document.getElementById(containerId);
    container.innerHTML += paginacionHTML;
}

let productosGlobales = [];

function cambiarPagina(pagina, containerId){

    const container = document.getElementById(containerId);

    if(productosGlobales.length > 0){
        mostrarProductos(productosGlobales, container, pagina);
    }
}

    
});



