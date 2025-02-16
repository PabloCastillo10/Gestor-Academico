export const tieneRole = (...roles) => {
    return (req, res, next) => {
        if(!req.student) {
            return res.status(500).json({
                succes: false,
                msg: 'Se quiere verificar un role sin validar el token primero'
            })
        }

        if(!roles.includes(req.student.role)){
            return res.status(401).json({
                success: false,
                msg: `Estudiante no autorizado, posee un role ${req.student.role}, los roles autorizados son ${roles}`
            })
        }
    }
}