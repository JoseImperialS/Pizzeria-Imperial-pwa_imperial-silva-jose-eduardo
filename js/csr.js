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
            if (!contenedor) return;

            let htmlContent = '';

            const categorias = [...new Set(productos.map(p => p.categoria))];

            categorias.forEach(categoria => {
                htmlContent += `<h2 class="titulo-categoria">${categoria.toUpperCase()}</h2>`;
                htmlContent += `<div class="catalogo-grid">`;

                const productosCategoria = productos.filter(p => p.categoria === categoria);

                productosCategoria.forEach(producto => {
                    // AQUÍ ESTÁ LA MAGIA: Adaptamos el nombre al formato de tus archivos
                    let nombreImagen = producto.nombre.toLowerCase().replace(/ /g, '');
                    if (categoria === "PIZZAS") {
                        nombreImagen = "pizza" + nombreImagen;
                    }

                    htmlContent += `
    <div class="producto-card card">
        <img src="img/${nombreImagen}.jpg"
             alt="${producto.nombre}"
             style="width:100%; border-radius: 8px; margin-bottom: 10px;"
             onerror="this.src='img/logo.jpg'">

        <h3>${producto.nombre}</h3>
        <p class="precio">Precio: $${producto.precio}</p>

        <button class="btn-agregar"
            onclick='agregarAlCarrito(${JSON.stringify(producto)})'>
            Agregar al carrito
        </button>
    </div>
`;


                });

                htmlContent += `</div > `;
            });

            contenedor.innerHTML = htmlContent;
        })
        .catch(error => console.error("Hubo un problema con el catálogo:", error));
}


