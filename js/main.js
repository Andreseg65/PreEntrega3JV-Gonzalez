let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

function mostrarInventario() {
    const inventarioDiv = document.getElementById("inventario");
    inventarioDiv.innerHTML = ""; // Limpio el inventario previo

    if (inventario.length === 0) {
        inventarioDiv.innerHTML = "<p>El inventario está vacío.</p>";
    } else {
        inventario.forEach((cuaderno, index) => {
            const cuadernoDiv = document.createElement("div");
            cuadernoDiv.innerHTML = `
                <strong>${index + 1}. Nombre:</strong> ${cuaderno.nombre}, 
                <strong>Tipo:</strong> ${cuaderno.tipo}, 
                <strong>Categoría:</strong> ${cuaderno.categoria}, 
                <strong>Precio:</strong> $${cuaderno.precio}, 
                <strong>Cantidad:</strong> ${cuaderno.cantidad}
            `;
            inventarioDiv.appendChild(cuadernoDiv);
        });
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.innerHTML = mensaje;
    mensajeDiv.className = tipo; // Asigno la clase en función del tipo de mensaje (success o error)
    mensajeDiv.style.display = "block";

    // Oculto el mensaje después de 3 segundos. Se que me adelante con esta función pero me gustó y quise usarla.
    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 3000);
}

function agregarCuaderno() {
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (nombre && tipo && categoria && precio && cantidad) {
        const cuaderno = { nombre, tipo, categoria, precio, cantidad };
        inventario.push(cuaderno);
        localStorage.setItem("inventario", JSON.stringify(inventario)); // Guardo en localStorage
        mostrarInventario();
        limpiarFormulario();
        mostrarMensaje(`Cuaderno "${nombre}" agregado con éxito.`, "success");
    } else {
        mostrarMensaje("Por favor, completa todos los campos.", "error");
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
}

document.getElementById("agregarBtn").addEventListener("click", agregarCuaderno);

// Muestro el inventario inicial al cargar la página
mostrarInventario();
