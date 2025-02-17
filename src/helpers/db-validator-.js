import Student from '../student/student.model.js';
import Teacher from '../teacher/teacher.model.js';

export const existenteEmailStudent = async (email = ' ') => {

    const existeEmail = await Student.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existenteEmailTeacher = async (email = ' ') => {

    const existeEmail = await Teacher.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existeTeacherById = async (id = '') => {
    
    const existeTeacher = await Teacher.findById(id);

    if (!existeTeacher) {
        throw new Error(`El ID ${ id } no existe en la base de datos`);
    }
}

export const existeStudentById = async (id = '') => {
    
    const existeStudent = await Student.findById(id);

    if (!existeStudent) {
        throw new Error(`El ID ${ id } no existe en la base de datos`);
    }
}