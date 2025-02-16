
import teacherModel from "../teacher/teacher.model.js";


export const existeEmailTeacher = async (email = ' ') => {
    const existeEmailTeacher = await teacherModel.findOne({ email });
    
    if (existeEmailTeacher) {
        throw new Error (`El email ${email} ya existe en la base de datos`);
    }
}

export const existeEmailTeacherById = async (id = ' ') => {
    const existeUsuario = await teacherModel.findById(id);
    
    if (!existeEmailTeacher) {
        throw new Error (`No se encontró un usuario con el id ${id}`);
    }
}
    