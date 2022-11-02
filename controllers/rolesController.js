import Rol from "../models/Rol.js";

const agregar = async (req, res) => {
    //evitar roles duplicados por nombre
    const { nombreRol } =  req.body;
    const existeRol = await Rol.findOne({ nombreRol });

    if (existeRol) {
        const error = new Error("Rol ya esta registrado en la base de datos.");
        return res.status(400).json({ msg: error.message, ok: "NO" });
    }

    try {
        const rol = new Rol(req.body);
        const rolGuardado = await rol.save();
        res.json({ body: rolGuardado, ok: "SI" })
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    //console.log("estoy en el metodo listar");
    const roles = await Rol.find();
    res.json(roles);
}

const eliminar = async (req, res) => {
    //Recibir los parametros por la URL
    const { id } = req.params;
    
    
    //Validamos si existe el registro a eliminar
    const rol = await Rol.findById(id);

    if (!rol) {
        const error = new Error("Registro no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO"});
        
    }
    try {
        await rol.deleteOne();
        res.json({ msg: "Registro eliminado Correctamente.", ok: "SI"});
    } catch (error) {
        console.log(error);
    }

}

const editar = async (req, res) => {
    //console.log("estoy en el metodo editar");
    //Recibir los parametros por la URL
    const { id } = req.params;
        
    //Validamos si existe el registro a eliminar
    const rol = await Rol.findById(id);

    if (!rol) {
        const error = new Error("Registro no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO"});
        
    }
    //Capturar los datos enviados en el formualario
    rol.nombreRol = req.body.nombreRol || rol.nombreRol;
    rol.estadoRol = req.body.estadoRol || rol.estadoRol;

    try {
        const rolGuardado = await rol.save();
        res.json({ body: rolGuardado, msg: "Registro Actualizado Correctamente.", ok: "SI"});
    } catch (error) {
        console.log(error);
    }


}

const listarUno = async (req, res) => {
    //console.log("estoy en el metodo listarUno");

    //Recibir los parametros por la URL
    const { id } = req.params;
        
    //Validamos si existe el registro a eliminar
    const rol = await Rol.findById(id);

    if (!rol) {
        const error = new Error("Registro no encontrado.");
        return res.status(404).json({ msg: error.message, ok: "NO"});
        
    }
    res.json(rol);
}

export {
    agregar,
    listar,
    eliminar,
    editar,
    listarUno
}