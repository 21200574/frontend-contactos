import {
    obtenerContactos,
    agregarContacto,
    agregarDatoContacto,
    eliminarContacto,
    actualizarContacto,
    actualizarDatoContacto
}
from "./api/contactosApi.js";

import {
    mostrarContactos
}
from "./ui/ui.js";

document.addEventListener("DOMContentLoaded", () => {

    cargarContactos();

    document.getElementById("formContacto")
        .addEventListener("submit", guardarContacto);

    document.getElementById("formEditar")
        .addEventListener("submit", guardarCambios);

    document.addEventListener("click", prepararEliminar);
    document.addEventListener("click", prepararEditar);

    document.getElementById("btnConfirmarEliminar")
        .addEventListener("click", confirmarEliminar);

});

async function cargarContactos() {

    const contactos = await obtenerContactos();

    mostrarContactos(contactos);

}

async function guardarContacto(e) {

    e.preventDefault();

    const contacto = {
        nombre: document.getElementById("txtNombre").value,
        apellido: document.getElementById("txtApellido").value,
        fecha_nacimiento: document.getElementById("txtFechaNacimiento").value,
        id_categoria: parseInt(document.getElementById("txtCategoria").value)
    };

    const respuestaContacto = await agregarContacto(contacto);

    const idContacto = respuestaContacto?.id_contacto;

    if (!idContacto) {
        alert("No se recibió el id_contacto.");
        return;
    }

    const telefono = document.getElementById("txtTelefono").value;
    const correo = document.getElementById("txtCorreo").value;

    if (telefono.trim() !== "") {
        await agregarDatoContacto({
            id_contacto: idContacto,
            tipo_dato: "Teléfono",
            valor: telefono,
            es_principal: true
        });
    }

    if (correo.trim() !== "") {
        await agregarDatoContacto({
            id_contacto: idContacto,
            tipo_dato: "Correo",
            valor: correo,
            es_principal: false
        });
    }

    alert("Contacto agregado correctamente");

    document.getElementById("formContacto").reset();

    bootstrap.Modal.getInstance(
        document.getElementById("modalContacto")
    ).hide();

    cargarContactos();

}

function prepararEditar(e) {

    if (e.target.closest(".btnEditar")) {

        const boton = e.target.closest(".btnEditar");

        document.getElementById("txtIdEditar").value = boton.dataset.id;
        document.getElementById("txtNombreEditar").value = boton.dataset.nombre;
        document.getElementById("txtApellidoEditar").value = boton.dataset.apellido;
        document.getElementById("txtCategoriaEditar").value = boton.dataset.categoria;
        document.getElementById("txtFechaEditar").value = "2000-01-01";

        document.getElementById("txtTelefonoEditar").value =
            boton.dataset.telefono === "No registrado" ? "" : boton.dataset.telefono;

        document.getElementById("txtCorreoEditar").value =
            boton.dataset.correo === "No registrado" ? "" : boton.dataset.correo;

        document.getElementById("txtPrincipalEditar").checked =
            boton.dataset.principal === "Sí";

        const modalEditar = new bootstrap.Modal(
            document.getElementById("modalEditar")
        );

        modalEditar.show();

    }

}

async function guardarCambios(e) {

    e.preventDefault();

    try {

        alert("Intentando actualizar...");

        const idContacto = document.getElementById("txtIdEditar").value;

        const contacto = {
            id_contacto: parseInt(idContacto),
            nombre: document.getElementById("txtNombreEditar").value,
            apellido: document.getElementById("txtApellidoEditar").value,
            fecha_nacimiento: document.getElementById("txtFechaEditar").value,
            id_categoria: parseInt(document.getElementById("txtCategoriaEditar").value)
        };

        const telefono = document.getElementById("txtTelefonoEditar").value;
        const correo = document.getElementById("txtCorreoEditar").value;
        const principal = document.getElementById("txtPrincipalEditar").checked;

        console.log("Contacto a actualizar:", contacto);

        const respuestaContacto =
            await actualizarContacto(contacto);

        console.log("Respuesta actualizar contacto:", respuestaContacto);

        const respuestaTelefono =
            await actualizarDatoContacto({
                id_contacto: parseInt(idContacto),
                tipo_dato: "Teléfono",
                valor: telefono,
                es_principal: principal
            });

        console.log("Respuesta actualizar teléfono:", respuestaTelefono);

        const respuestaCorreo =
            await actualizarDatoContacto({
                id_contacto: parseInt(idContacto),
                tipo_dato: "Correo",
                valor: correo,
                es_principal: !principal
            });

        console.log("Respuesta actualizar correo:", respuestaCorreo);

        alert("Contacto actualizado correctamente");

        bootstrap.Modal.getInstance(
            document.getElementById("modalEditar")
        ).hide();

        cargarContactos();

    } catch (error) {

        console.error("Error al actualizar:", error);

        alert("Ocurrió un error al actualizar. Revisa la consola.");

    }

}

function prepararEliminar(e) {

    if (e.target.closest(".btnEliminar")) {

        const boton = e.target.closest(".btnEliminar");

        document.getElementById("txtIdEliminar").value =
            boton.dataset.id;

    }

}

async function confirmarEliminar() {

    const idContacto =
        document.getElementById("txtIdEliminar").value;

    const respuesta =
        await eliminarContacto(idContacto);

    if (respuesta.ok) {
        alert("Contacto eliminado correctamente");
    } else {
        alert("No se pudo eliminar el contacto");
        return;
    }

    bootstrap.Modal.getInstance(
        document.getElementById("modalEliminar")
    ).hide();

    cargarContactos();

}