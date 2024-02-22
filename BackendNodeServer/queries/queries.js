const connection = require('../connection/connection');


const obtenerTodasLasEntradas = async () => {
    const [queries] = await connection.execute('select *, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha from entradas order by id desc');
    return queries;
}

const obtenerLasEntradasPorTitulo = async (titulo) => {
    const [queries] = await connection.execute(`select *, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha from entradas where titulo like ?`, ['%' + titulo + '%']);
    return queries;
}
const obtenerLasEntradasPorAutor = async (autor) => {
    const [queries] = await connection.execute(`select *, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha from entradas where autor like ?`, ['%' + autor + '%']);
    return queries;
}
const obtenerLasEntradasPorContenido = async (contenido) => {
    const [queries] = await connection.execute(`select *, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha from entradas where contenido like ?`, ['%' + contenido + '%']);
    return queries;
}

const GuardarEntradas = async (titulo, autor, fecha, contenido) => {
    const [queries] = await connection.execute(`insert into entradas (titulo, autor, fecha, contenido) values (?,?,?,?) `, [titulo, autor, fecha, contenido]);
    return queries;
}

module.exports = { obtenerTodasLasEntradas, GuardarEntradas, obtenerLasEntradasPorTitulo, obtenerLasEntradasPorAutor, obtenerLasEntradasPorContenido }