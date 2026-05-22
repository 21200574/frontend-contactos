export function mostrarContactos(contactos) {

    const contenidoTabla = document.getElementById("contenidoTabla");
    contenidoTabla.innerHTML = "";

    if (!contactos || contactos.length === 0) {
        contenidoTabla.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-muted">
                    No hay contactos registrados
                </td>
            </tr>
        `;
        return;
    }

    const contactosAgrupados = {};

    contactos.forEach(contacto => {

        const id = contacto.id_contacto;

        if (!contactosAgrupados[id]) {

            contactosAgrupados[id] = {
                id_contacto: contacto.id_contacto,
                nombre: contacto.nombre,
                apellido: contacto.apellido,
                categoria: contacto.nombre_categoria,
                id_categoria: obtenerIdCategoria(contacto.nombre_categoria),
                telefono: "No registrado",
                correo: "No registrado",
                principal: "No"
            };

        }

        if (contacto.tipo_dato === "Teléfono") {
            contactosAgrupados[id].telefono = contacto.valor ?? "No registrado";

            if (contacto.es_principal == 1) {
                contactosAgrupados[id].principal = "Sí";
            }
        }

        if (contacto.tipo_dato === "Correo") {
            contactosAgrupados[id].correo = contacto.valor ?? "No registrado";

            if (contacto.es_principal == 1) {
                contactosAgrupados[id].principal = "Sí";
            }
        }

    });

    Object.values(contactosAgrupados).forEach(contacto => {

        contenidoTabla.innerHTML += `
            <tr>
                <td>${contacto.id_contacto}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.apellido}</td>
                <td>${contacto.categoria}</td>
                <td>${contacto.telefono}</td>
                <td>${contacto.correo}</td>
                <td>
                    <span class="badge ${contacto.principal === "Sí" ? "bg-success" : "bg-secondary"}">
                        ${contacto.principal}
                    </span>
                </td>
                <td class="text-center">
                    <button
                        class="btn btn-warning btn-sm me-2 btnEditar"
                        data-id="${contacto.id_contacto}"
                        data-nombre="${contacto.nombre}"
                        data-apellido="${contacto.apellido}"
                        data-categoria="${contacto.id_categoria}"
                        data-telefono="${contacto.telefono}"
                        data-correo="${contacto.correo}"
                        data-principal="${contacto.principal}">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button
                        class="btn btn-danger btn-sm btnEliminar"
                        data-id="${contacto.id_contacto}"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;

    });

}

function obtenerIdCategoria(categoria) {

    if (categoria === "Familia") return 1;
    if (categoria === "Trabajo") return 2;
    if (categoria === "Escuela") return 3;
    if (categoria === "Amigos") return 4;

    return 1;
}