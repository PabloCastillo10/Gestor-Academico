import jwt from 'jsonwebtoken';

import Teacher from '../teacher/teacher.model.js';
import Student from '../student/student.model.js';

export const validarStudentJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(400).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const student = await Student.findById(uid);

        if (!student) {
            return res.status(400).json({
                msg: 'Token del estudiante no existe en la base de datos'
            });
        }

        if (!student.estado) {
            return res.status(400).json({
                msg: 'Token no válido - estudiantes con estado: false'
            });
        }
        
        req.student = student;
        
        next();
    
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "Token no válido"
        });
    }
};

export const validarTeacherJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(400).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const teacher = await Teacher.findById(uid);

        if (!teacher) {
            return res.status(400).json({
                msg: 'Profesor no existe en la base de datos'
            });
        }

        if (!teacher.estado) {
            return res.status(400).json({
                msg: 'Token no válido - profesores con estado: false'
            });
        }
        
        req.teacher = teacher;
        
        next();
    
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "Token no válido"
        });
    }
};