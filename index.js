//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';

//importar archivos de rutas
import rolesRoutes from "./routes/rolesRoutes.js";
import especialidadesRoutes from "./routes/especialidadesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import agendaCitasRoutes from "./routes/agendaCitasRoutes.js";

//iniciar el servidor de express
const app = express();
app.use(express.json());//para leer datos en formato json

//permitir leer archivos .env
dotenv.config();

//conectarnos a la base de datos
conectarDB();

//definicion de las rutas o routing
app.use("/api/roles", rolesRoutes);
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/agendacitas", agendaCitasRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});

