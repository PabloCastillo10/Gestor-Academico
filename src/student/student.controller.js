import Student from './student.model.js'
import { hash, verify } from 'argon2'
import { generarJWT } from '../helpers/generate-jwt.js'
import { response, request } from 'express'

export const login = async (req, res) => {

    const { email, password, username } = req.body;
    
    try {
        const lowerEmail = email ? email.toLowerCase() : null;    
        const lowerUsername = username ? username.toLowerCase() : null;
        
        const student = await Student.findOne({ 
            $or: [{ email: lowerEmail }, { username: lowerUsername }] 
        });

        if (!student) {
            return res.status(404).json({ 
                msg: 'Credenciales incorrectas, correo o nombre de usuario no existe en la base de datos' 
            });
        }

        if (!student.estado) {
            return res.status(400).json({
                msg: 'El estudiante no existe en la base de datos'
            });
        }

        const validPassword = await verify(student.password, password);
        
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(student.id);

        return res.status(200).json({
            msg: '¡¡Inicio de Sesión exitoso!!',
            studentDetails: {
                username: student.username,
                token: token
            }
        })

    } catch (e) {

        console.error(e);

        return res.status(500).json({
            msg: 'Server error',
            error: e.message
        })
    }
}

export const register = async (req, res) => {

    try {

        const data = req.body;

        const encryptedPassword = await hash(data.password);

        const student = await Student.create({
            name: data.name,
            surname: data.surname,
            username: data.username.toLowerCase(),
            email: data.email.toLowerCase(),
            phone: data.phone,
            password: encryptedPassword
        });

        res.status(200).json({
            msg: '¡¡Estudiante registrado exitosamente!!',
            studentDetails: {
                user: student
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'User registration failded',
            error: error.message
        })
    }
}

export const getStudents = async (req = request, res = response) => {
    try {
        
        const { limite = 10, desde = 0 } = req.body;
        const query = { estado: true };

        const [ total, students ] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            students
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los estudiantes',
            error
        })
    }
}

export const getStudentById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(400).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            student
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el estudiante',
            error
        })
    }
}

export const updateStudent = async (req, res = response) => {
    try {
        
        const { id } = req.params;
        const { _id, password, email, role, ...data } = req.body;
        let { username } = req.body;

        if (username) {
            username = username.toLowerCase();
            data.username = username;
        }

        if (!password) {
            data.password = await hash(password);
        }

        const student = await Student.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Estudiante Actualizado",
            student
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el estudiante',
            error
        })
    }
}

export const updatePassword = async (req, res = response) => {
    try {
        
        const { id } = req.params;
        let { password } = req.body;

        if (password) {
            var newPassword = await hash(password);
        }

        const student = await Student.findByIdAndUpdate(id, { password: newPassword }, { new: true });

        res.status(200).json({
            success: true,
            msg: "Contraseña actualizada",
            student
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la contraseña',
            error
        })
    }
}

export const deleteStudent = async (req, res = response) => {
    try {
        
        const { id } = req.params;

        const student = await Student.findByIdAndUpdate(id, { estado: false }, { new: true });

        const authenticatedStudent = req.student;

        res.status(200).json({
            success: true,
            msg: 'Estudiante eliminado',
            student,
            authenticatedStudent
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el estudiante',
            error
        })
    }
}

export const activateStudent = async (req, res = response) => {
    try {
        
        const { id } = req.params;

        const student = await Student.findByIdAndUpdate(id, { estado: true }, { new: true });

        const authenticatedStudent = req.student;

        res.status(200).json({
            success: true,
            msg: 'Estudiante activado',
            student,
            authenticatedStudent
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al activar el estudiante',
            error
        })
    }
}