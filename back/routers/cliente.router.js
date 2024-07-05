const { Router } = require("express");
const ClientesController = require("../controllers/clientes.controller.js");
const clientesController = new ClientesController();

const clienteRouters = Router();

clienteRouters.get("/", async (req, res) => {
    const data = await clientesController.getAll();
    res.status(200).json(data);
});

clienteRouters.get("/:cuil", async (req, res) => {
    const { cuil } = req.params;
    const data = await clientesController.getByCuil(cuil);
    if (!data) {
        res.status(404).json({ error: "No existe una persona con ese cuil" });
    } else {
        res.status(200).json(data);
    }
});

clienteRouters.post("/", async (req, res) => {
    const { cuil, nombre, id_tipo_cliente, fecha_nacimiento } = req.body;
    const newCliente = { Cuil: cuil, Nombre: nombre, id_tipo_cliente, Fecha_nacimiento: fecha_nacimiento };
    const resultado = await clientesController.crearCliente(newCliente);
    if (resultado) {
        res.status(201).json(resultado);
    } else {
        res.status(400).json({ error: "No se pudo agregar al cliente" });
    }
});

clienteRouters.delete("/:cuil", async (req, res) => {
    const { cuil } = req.params;
    const eliminado = await clientesController.getByCuil(cuil);
    await clientesController.deleteByCuil(cuil);
    if (!eliminado) {
        res.status(404).json({ error: "Cliente no encontrado" });
    } else {
        res.status(202).json(eliminado);
    }
});

clienteRouters.put("/:cuil", async (req, res) => {
    const { cuil } = req.params;
    const { nombre, id_tipo_cliente, fecha_nac } = req.body;
    const data = { Cuil: parseInt(cuil), Nombre: nombre, id_tipo_cliente, Fecha_nacimiento: fecha_nac };
    const resultado = await clientesController.modificarCliente(data);
    if (resultado.error) {
        res.status(404).json(resultado);
    } else {
        res.status(200).json(resultado);
    }
});

clienteRouters.use("/", (req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

module.exports = clienteRouters;
