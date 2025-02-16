import jwt from 'jsonwebtoken';

import studentModel from '../student/student.model';

export const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        const student = await studentModel.findById(uid);

        if (!student) {
            return res.status(401).json({
                msg: 'Student no existe en la base de datos'
            });
        }

        if (!student.estado) {
            return res.status(401).json({
                msg: 'Token no válido - students con estado: false'
            });
        }
        
        req.student = student;
        
        next();
    
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};