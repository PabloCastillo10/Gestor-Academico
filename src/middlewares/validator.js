import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existeEmailTeacher } from "../helpers/db-validator-teacher.js";
import { existeEmailStudent } from "../helpers/db-validator-student.js";

export const registerStudentValidator = [
    body("name", "El nombre es obligatorio").notEmpty(),
    body("age", "La edad es obligatoria").notEmpty().isNumeric().withMessage("La edad debe ser un número"),
    body("surname", "El apellido es obligatorio").notEmpty(),
    body("email", "El email es obligatorio").notEmpty().isEmail().withMessage("Debe ser un correo válido"),
    body("email").custom(existeEmailStudent),
    body("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    validarCampos,
];

export const registerTeacherValidator = [
    body("name", "El nombre es obligatorio").notEmpty(),
    body("age", "La edad es obligatoria").notEmpty().isNumeric().withMessage("La edad debe ser un número"),
    body("surname", "El apellido es obligatorio").notEmpty(),
    body("email", "El email es obligatorio").notEmpty().isEmail().withMessage("Debe ser un correo válido"),
    body("email").custom(existeEmailTeacher),
    body("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    validarCampos,
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Enter a valid username"),
    body("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    validarCampos,
];
