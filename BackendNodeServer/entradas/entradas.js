const { Router } = require('express');
const queries = require('../queries/queries');
const router = Router();

router.get('/', async (req, res) => {
    const query = await queries.obtenerTodasLasEntradas();
    return res.status(200).json(query);
});

router.post('/', async (req, res) => {
    const { titulo, autor, fecha, contenido } = req.body;
    if (titulo == "") {
        return res.status(200).json({ msg: { id: 0, titulo: "es Obligatorio", contenido: "", autor: "" } });
    }
    if (autor == "") {
        return res.status(200).json({ msg: { id: 0, autor: "es Obligatorio", titulo: "", contenido: "" } });
    }
    if (contenido == "") {
        return res.status(200).json({ msg: { id: 0, contenido: "es Obligatorio", autor: "", titulo: "" } });
    }
    const query = await queries.GuardarEntradas(titulo, autor, fecha, contenido);
    return res.status(201).json({ msg: { id: query.insertId, autor: autor, titulo: titulo, contenido: contenido } });
});

router.get('/titulo/:titulo', async (req, res) => {
    const { titulo } = req.params;
    if (titulo == "") {
        return res.status(200).json({ msg: "es Obligatorio" });
    }
    const query = await queries.obtenerLasEntradasPorTitulo(titulo);
    if (query.length === 0) {
        return res.status(200).json({ msg: "No se encontro" });
    }
    return res.status(200).json({ msg: "ok", datos: query });
});

router.get('/autor/:autor', async (req, res) => {
    const { autor } = req.params;
    if (autor == "") {
        return res.status(200).json({ msg: "es Obligatorio" });
    }
    const query = await queries.obtenerLasEntradasPorAutor(autor);
    if (query.length === 0) {
        return res.status(200).json({ msg: "No se encontro" });
    }
    return res.status(200).json({ msg: "ok", datos: query });
});

router.get('/contenido/:contenido', async (req, res) => {
    const { contenido } = req.params;
    if (contenido == "") {
        return res.status(200).json({ msg: { contenido: "es Obligatorio" } });
    }
    const query = await queries.obtenerLasEntradasPorContenido(contenido);
    if (query.length === 0) {
        return res.status(200).json({ msg: "No se encontro" });
    }
    return res.status(200).json({ msg: "ok", fatos: query });
});

module.exports = router;