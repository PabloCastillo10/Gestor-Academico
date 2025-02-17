import Teacher from './teacher.model.js'
import { hash, verify } from 'argon2'
import { generarJWT } from '../helpers/generate-jwt.js'
import { response, request } from 'express'

export const login = async (req, res) => {

    const { email, password, username } = req.body;
    
    try {
        const lowerEmail = email ? email.toLowerCase() : null;    
        const lowerUsername = username ? username.toLowerCase() : null;
        
        const teacher = await Teacher.findOne({ 
            $or: [{ email: lowerEmail }, { username: lowerUsername }] 
        });

        if (!teacher) {
            return res.status(404).json({ 
                msg: 'Credenciales incorrectas, correo o nombre de usuario no existe en la base de datos' 
            });
        }

        if (!teacher.estado) {
            return res.status(400).json({
                msg: 'El profesor no existe en la base de datos'
            });
        }

        const validPassword = await verify(teacher.password, password);
        
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(teacher.id);

        return res.status(200).json({
            msg: '¡¡Inicio de Sesión exitoso!!',
            teacherDetails: {
                username: teacher.username,
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

        const teacher = await Teacher.create({
            name: data.name,
            surname: data.surname,
            username: data.username.toLowerCase(),
            email: data.email.toLowerCase(),
            phone: data.phone,
            password: encryptedPassword
        });

        res.status(200).json({
            msg: '¡¡Profesor registrado exitosamente!!',
            teacherDetails: {
                user: teacher
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

export const getTeachers = async (req = request, res = response) => {
    try {
        
        const { limite = 10, desde = 0 } = req.body;
        const query = { estado: true };

        const [ total, teachers ] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            teachers
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los profesores',
            error
        })
    }
}

export const getTeacherById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).json({
            success: true,
            teacher
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el profesor',
            error
        })
    }
}

export const updateTeacher = async (req, res = response) => {
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

        const teacher = await Teacher.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Profesor Actualizado",
            teacher
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el profesor',
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

        const teacher = await Teacher.findByIdAndUpdate(id, { password: newPassword }, { new: true });

        res.status(200).json({
            success: true,
            msg: "Contraseña actualizada",
            teacher
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la contraseña',
            error
        })
    }
}

export const deleteTeacher = async (req, res = response) => {
    try {
        
        const { id } = req.params;

        const teacher = await Teacher.findByIdAndUpdate(id, { estado: false }, { new: true });

        const authenticatedTeacher = req.teacher;

        res.status(200).json({
            success: true,
            msg: 'Profesor eliminado',
            teacher,
            authenticatedTeacher
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el profesor',
            error
        })
    }
}

export const activateTeacher = async (req, res = response) => {
    try {
        
        const { id } = req.params;

        const teacher = await Teacher.findByIdAndUpdate(id, { estado: true }, { new: true });

        const authenticatedTeacher = req.teacher;

        res.status(200).json({
            success: true,
            msg: 'Profesor activado',
            teacher,
            authenticatedTeacher
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al activar el profesor',
            error
        })
    }
}