const API_URL =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=contactos-completos";

const API_AGREGAR_CONTACTO =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=agregar-contacto";

const API_AGREGAR_DATO =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=agregar-dato-contacto";

const API_ELIMINAR =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=eliminar-contacto";

const API_ACTUALIZAR =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=actualizar-contacto";

const API_ACTUALIZAR_DATO =
    "https://leonardoalvarezperez.com/contactos/index.php?accion=actualizar-dato-contacto";

export async function obtenerContactos() {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    return datos.data || [];
}

export async function agregarContacto(contacto) {
    const respuesta = await fetch(API_AGREGAR_CONTACTO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contacto)
    });

    return await respuesta.json();
}

export async function agregarDatoContacto(datos) {
    const respuesta = await fetch(API_AGREGAR_DATO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    return await respuesta.json();
}

export async function eliminarContacto(id_contacto) {
    const respuesta = await fetch(API_ELIMINAR, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_contacto: id_contacto
        })
    });

    return await respuesta.json();
}

export async function actualizarContacto(contacto) {
    const respuesta = await fetch(API_ACTUALIZAR, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contacto)
    });

    return await respuesta.json();
}

export async function actualizarDatoContacto(datos) {
    const respuesta = await fetch(API_ACTUALIZAR_DATO, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    return await respuesta.json();
}