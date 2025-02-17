export const tieneRole = (...roles) => {
    
    return (req, res, next) => {
        if (!roles.includes(req.student.role)) {
            return res.status(400).json({
                success: false,
                message: `Estudiante no autorizado, posee un rol ${req.student.role}, el role autorizado es ${ roles }`
            });
        }
        
        if (!roles.includes(req.teacher.role)) {
            return res.status(400).json({
                success: false,
                message: `Profesor no autorizado, posee un rol ${req.teacher.role}, el role autorizado es ${ roles }`
            });
        }
        
        next();

    }
}