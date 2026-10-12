document.addEventListener("DOMContentLoaded", () => {
    cargarCatalogo();
});

function cargarCatalogo() {
    fetch('catalogo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el catálogo");
            }
            return response.json();
        })
        .then(productos => {
            const contenedor = document.getElementById('zona-catalogo');
            let htmlContent = '';

            productos.forEach(producto => {
                htmlContent += `
                    <article class="producto-card">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                        <h3 class="producto-nombre">${producto.nombre}</h3>
                        <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                        <button class="btn-agregar" onclick="agregar(${producto.id})">Agregar</button>
                    </article>
                `;
            });

            contenedor.innerHTML = htmlContent;
        })
        .catch(error => console.error("Hubo un problema con la petición Fetch:", error));
}

// Función placeholder para el botón
function agregar(id) {
    console.log(`Producto ${id} agregado (Función en desarrollo)`);
}