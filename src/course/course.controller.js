import studentModel from "../student/student.model.js";
import Course from "./course.model.js"
import { response, request } from "express"


export const saveCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await Course.create({
            name: data.name.toLowerCase(),
            description: data.description
        })
        res.status(200).json({
            msg: 'Curso registred successfully',
            courseDetails: {
                course: course
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Course registration failded',
            error: error.message
        })
    }
}
export const getCourses = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query; 
        const query = {}; 
        
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        
        res.status(200).json({
            success: true,
            total,
            courses
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error getting courses',
            error: error.message
        });
    }
};
export const getCourseById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(400).json({
                success: false,
                msg: 'Course not found'
            });
        }
        res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error getting course by ID',
            error
        })
    }
}
export const updateCourse = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, students, ...data } = req.body; 

        let { name } = req.body;
        if (name) {
            name = name.toLowerCase();
            data.name = name;
        }

      
        const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found'
            });
        }

       
        if (students) {
            await studentModel.updateMany(
                { courses: id },
                { $pull: { courses: id } } 
            );

            await studentModel.updateMany(
                { _id: { $in: students } }, 
                { $addToSet: { courses: id } }
            );
        }

        res.status(200).json({
            success: true,
            msg: 'Course updated successfully',
            updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error updating course',
            error: error.message 
        });
    }
};
export const deleteCourse = async (req, res = response) => {
    try {
        const { id } = req.params;

       
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: 'Course not found'
            });
        }

        
        await studentModel.updateMany(
            { courses: id },
            { $pull: { courses: id } }
        );

        
        const deletedCourse = await Course.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Course deleted successfully and removed from students',
            deletedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error deleting course',
            error
        });
    }
};
export const trueCourse = async (req, res = response) => {
    try {
        
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, { status: true }, { new: true });
        const authenticatedCourse = req.course;
        res.status(200).json({
            success: true,
            msg: 'Course activate successfully',
            course,
            authenticatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error activate course',
            error
        })
    }
}