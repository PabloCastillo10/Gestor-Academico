import { Router } from "express";
import { check } from "express-validator";
import { existeStudentById } from "../helpers/db-validator-.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarStudentJWT } from "../middlewares/validar-jwt.js";
import { login, register, getStudents, getStudentById, updateStudent,  deleteStudent, activateStudent } from "./student.controller.js";
import { registerStudentValidator, loginValidator } from '../middlewares/validator.js';
import { deleteFileOnError } from '../middlewares/delete-file-on-error.js';

const router = Router();

            router.post(
                '/login',
                loginValidator,
                deleteFileOnError,
                login
            );

            router.post(
                '/register',
                registerStudentValidator,
                deleteFileOnError,
                register
            );

            router.get(
                '/',
                getStudents
            );

            router.get(
                '/search/:id',
                [
                    check('id', 'No es ID válido').isMongoId(),
                    check('id').custom(existeStudentById),
                    validarCampos
                ],
                getStudentById
            );

            router.put(
                '/:id',
                [
                    validarStudentJWT,
                    check('id', 'No es ID válido').isMongoId(),
                    check('id').custom(existeStudentById),
                    validarCampos
                ],
                updateStudent
            );

            

            router.delete(
                '/:id',
                [
                    validarStudentJWT,
                    check('id', 'No es ID válido').isMongoId(),
                    check('id').custom(existeStudentById),
                    validarCampos
                ],
                deleteStudent
            )

            router.put(
                '/activate/:id',
                [
                    validarStudentJWT,
                    check('id', 'No es ID válido').isMongoId(),
                    check('id').custom(existeStudentById),
                    validarCampos
                ],
                activateStudent
            )

export default router;