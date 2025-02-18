import { Router } from "express";
import { check } from "express-validator"
import { existeTeacherById } from "../helpers/db-validator-.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarTeacherJWT } from "../middlewares/validar-jwt.js";
import { login, register, getTeachers, getTeacherById, updateTeacher,  deleteTeacher, activateTeacher, assignCourseTeacher, getTeacherCourses } from "./teacher.controller.js";
import { registerTeacherValidator, loginValidator } from '../middlewares/validator.js';
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
        registerTeacherValidator,
        deleteFileOnError,
        register
    );

    router.get(
        '/',
        getTeachers
    );

    router.get(
        '/Teacher/:id',
        [
            check('id', 'No es ID válido').isMongoId(),
            check('id').custom(existeTeacherById),
            validarCampos
        ],
        getTeacherById
    );

    router.put(
        '/:id',
        [
            validarTeacherJWT,
            check('id', 'No es ID válido').isMongoId(),
            check('id').custom(existeTeacherById),
            validarCampos
        ],
        updateTeacher
    );

    
    router.delete(
        '/:id',
        [
            validarTeacherJWT,
            check('id', 'No es ID válido').isMongoId(),
            check('id').custom(existeTeacherById),
            validarCampos
        ],
        deleteTeacher
    )

    router.put(
        '/activate/:id',
        [
            validarTeacherJWT,
            check('id', 'No es ID válido').isMongoId(),
            check('id').custom(existeTeacherById),
            validarCampos
        ],
        activateTeacher
    )
    
    router.post(
        '/assign', assignCourseTeacher
    );

    router.get(
        '/list/:teacherId', getTeacherCourses
    );

export default router;