import { Router } from 'express';
import { check } from 'express-validator';
import { validarTeacherJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { saveCourse, getCourses, getCourseById, updateCourse, deleteCourse, trueCourse } from '../course/course.controller.js';
import { existeCourseById } from '../helpers/db-validator-.js';

const router = Router();


router.post('/',
    [
        validarTeacherJWT,
        check('name', 'El nombre del curso es obligatorio').notEmpty(),
        check('description', 'La descripción del curso es obligatoria').notEmpty(),
        validarCampos,
        ],
     saveCourse,);


router.get('/', getCourses);

router.get('/:id', getCourseById);


    router.put('/:id',[
        validarTeacherJWT,
    ],
        updateCourse);


router.delete('/:id',
    [
        validarTeacherJWT,
        ],
     deleteCourse);


router.put('/activate/:id',
    [
        validarTeacherJWT,
    ],    
     trueCourse);

export default router;
