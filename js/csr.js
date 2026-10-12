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

            // Obtener las categorías únicas
            const categorias = [...new Set(productos.map(p => p.categoria))];

            categorias.forEach(categoria => {
                // Agregar el título de la categoría
                htmlContent += `<h2 class="titulo-categoria">${categoria}</h2>`;
                htmlContent += `<div class="catalogo-grid">`; // Iniciar el grid de esta categoría

                // Filtrar y agregar solo los productos de esta categoría
                const productosCategoria = productos.filter(p => p.categoria === categoria);

                productosCategoria.forEach(producto => {
                    htmlContent += `
                        <article class="producto-card">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                            <h3 class="producto-nombre">${producto.nombre}</h3>
                            <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                            <button class="btn-agregar" onclick="agregar(${producto.id})">Agregar</button>
                        </article>
                    `;
                });

                htmlContent += `</div>`; // Cerrar el grid
            });

            // En index.html, quitaremos la clase catalogo-grid del main para que no se empalme
            contenedor.innerHTML = htmlContent;
            contenedor.classList.remove('catalogo-grid');
        })
        .catch(error => console.error("Hubo un problema con la petición Fetch:", error));
}

function agregar(id) {
    console.log(`Producto ${id} agregado (Función en desarrollo)`);
}