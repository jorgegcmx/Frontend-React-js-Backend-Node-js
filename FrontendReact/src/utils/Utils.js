
export function validaConexionInternet() {
    let valida = false;
    if (navigator.onLine) {
        valida = true
    }
    return valida;
}


export function guardalocalStorage(tareas, isOnline) {
    if (isOnline) {
        return localStorage.setItem("tareas", JSON.stringify(tareas));
    } else {
        return JSON.parse(localStorage.getItem('tareas'));
    }

}

export function limitaContenido(contenido) {
    contenido.substring(0, 70)
    return contenido.substring(0, 70)
}


