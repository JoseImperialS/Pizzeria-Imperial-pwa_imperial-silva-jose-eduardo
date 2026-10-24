// csr.js — Renderizado en el Cliente (CSR)
// El HTML llega casi vacío y es ESTE archivo, ya corriendo en el navegador,
// quien construye el contenido.

// 1) Buscamos el contenedor vacío que dejamos en index.html
const contenedorCatalogo = document.getElementById("catalogo");

// 2) fetch() le pide el archivo catalogo.json al servidor (simula una API real)
fetch("catalogo.json")
    .then((respuesta) => respuesta.json())
    .then((productos) => {
        // 3) Ya tenemos los productos: limpiamos el contenedor y dibujamos las tarjetas
        contenedorCatalogo.innerHTML = "";
        contenedorCatalogo.removeAttribute("aria-busy");
        contenedorCatalogo.removeAttribute("aria-label");

        productos.forEach((producto) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "producto";
            tarjeta.dataset.categoria = producto.categoria; // queda como data-categoria="..."

            tarjeta.innerHTML = `
        <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <strong>${producto.nombre}</strong>
        <span class="precio">$${producto.precio}</span>
        <p>Stock: ${producto.stock}</p>
        <button type="button" data-id="${producto.id}">Agregar al carrito</button>
      `;

            contenedorCatalogo.appendChild(tarjeta);

            // conectamos el botón con la función agregarAlCarrito() de carrito.js
            tarjeta.querySelector("button").addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        });

        crearFiltros(productos);
    })
    .catch((error) => {
        // si algo falla (por ejemplo, sin conexión y sin caché), avisamos en pantalla
        contenedorCatalogo.innerHTML = "<p>No se pudo cargar el catálogo. Intenta más tarde.</p>";
        contenedorCatalogo.removeAttribute("aria-busy");
        contenedorCatalogo.removeAttribute("aria-label");
        console.error("Error al cargar catálogo:", error);
    });

// Crea los botones de categoría encima del catálogo y oculta las tarjetas que no coinciden
function crearFiltros(productos) {
    // Lista de categorías sin repetir, en el orden en que aparecen en catalogo.json
    const categorias = [...new Set(productos.map((p) => p.categoria))];

    const barra = document.createElement("div");
    barra.className = "filtros";
    barra.setAttribute("role", "group");
    barra.setAttribute("aria-label", "Filtrar por categoría");

    ["Todos", ...categorias].forEach((categoria) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = categoria;
        boton.setAttribute("aria-pressed", categoria === "Todos" ? "true" : "false");

        boton.addEventListener("click", () => {
            barra.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
            boton.setAttribute("aria-pressed", "true");
            contenedorCatalogo.querySelectorAll(".producto").forEach((tarjeta) => {
                tarjeta.hidden = categoria !== "Todos" && tarjeta.dataset.categoria !== categoria;
            });
        });

        barra.appendChild(boton);
    });

    // la barra va justo antes del contenedor del catálogo
    contenedorCatalogo.before(barra);
}