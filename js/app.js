fetch('data/productos.json')
.then(res => res.json())
.then(productos => {

    const container = document.getElementById('productos-container');
    const detalle = document.getElementById('detalle-producto');

    if(container){
        mostrarProductos(productos, container);

        const buscador = document.getElementById('buscador');
        buscador.addEventListener('keyup', e => {
            const texto = e.target.value.toLowerCase();
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
            mostrarProductos(filtrados, container);
        });
    }

    if(detalle){
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const producto = productos.find(p => p.id === id);

        if(producto){
            detalle.innerHTML = `
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" style="width:100%;max-width:500px;">
                <p>${producto.descripcion}</p>
                <h3>Especificaciones</h3>
                <ul>
                    ${producto.especificaciones.map(e => `<li>${e}</li>`).join('')}
                </ul>
                <a class="btn" target="_blank"
                href="https://wa.me/50688888888?text=Hola%20quiero%20cotizar%20${producto.nombre}">
                Solicitar cotización
                </a>
            `;
        }
    }

});

function mostrarProductos(productos, container){
    container.innerHTML = "";
    productos.forEach(producto => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <a class="btn" href="producto.html?id=${producto.id}">Ver detalle</a>
            </div>
        `;
    });
}
