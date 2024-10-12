function formatoNombre(nombre: string) {
    nombre = nombre.toLowerCase();
    nombre = nombre.substring(0,12);
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);

}

export const DATAUSER = [
    {data: JSON.parse(localStorage.getItem('DATAUSER') || '{}')}
]

export const ID_USUARIO = Object.keys(DATAUSER[0].data).length == 0 ? '0' : DATAUSER[0].data.id;
export const NOMBRE_USUARIO = Object.keys(DATAUSER[0].data).length == 0 ? 'NONE' : formatoNombre(DATAUSER[0].data.nombre);
export const NOMBRE_ROL = Object.keys(DATAUSER[0].data).length == 0 ? 'NONE' : DATAUSER[0].data.nombreRol.toUpperCase();