import jwt from 'jsonwebtoken';

import teacherModel from '../teacher/teacher.model';

export const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        const teacher = await teacherModel.findById(uid);

        if (!teacher) {
            return res.status(401).json({
                msg: 'Teacher no existe en la base de datos'
            });
        }

        if (!teacher.estado) {
            return res.status(401).json({
                msg: 'Token no válido - teacher con estado: false'
            });
        }
        
        req.teacher = teacher;
        
        next();
    
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};