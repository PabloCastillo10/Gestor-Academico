'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConecction} from './mongo.js';
import teacherRoutes from '../src/teacher/teacher.routes.js';
import studentRoutes from '../src/student/student.routes.js';
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) => {
    
    app.use("/gestorAcademico/v1/teachers", teacherRoutes);
    app.use("/gestorAcademico/v1/students", studentRoutes);
};

const conectarDB = async () => {
    try {
        await dbConecction();
        console.log('Conexion a la base de datos pe causa gaaaa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failded: ${error}`);
    }
}