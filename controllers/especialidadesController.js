import Especialidad from "../models/Especialidad.js";

const agregar = async (req, res) => {
    //evitar especialidades duplicadas
    const  { nombreEspecialidad } = req.body;
    const existeEspecialidad = await Especialidad.findOne({ nombreEspecialidad });

    if (existeEspecialidad) {
        const error = new Error("Especialidad ya esta registrada en la base de datos.");
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const especialidad = new Especialidad(req.body);
        const especialidadGuardada = await especialidad.save();
        res.json({ body: especialidadGuardada, ok: "SI" });
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    console.log("estoy en el metodo listar");
}

const eliminar = async (req, res) => {
    console.log("estoy en el metodo eliminar");
}

const editar = async (req, res) => {
    console.log("estoy en el metodo editar");
}

const listarUno = async (req, res) => {
    console.log("estoy en el metodo listarUno");
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno
}