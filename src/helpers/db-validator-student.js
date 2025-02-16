
import studentModel from "../student/student.model.js";


export const existeEmailStudent = async (email = ' ') => {
    const existeEmailStudent = await studentModel.findOne({ email });
    
    if (existeEmailStudent) {  
        throw new Error(`El email ${email} ya está registrado en la base de datos`);
    }
};

export const existeStudentById = async (id = ' ') => {
    const existeStudent = await studentModel.findOne({ id });
    
    if (!existeStudent) {
        throw new Error(`El estudiante con id ${id} no existe en la base de datos`);
    }
}