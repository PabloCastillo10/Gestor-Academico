import { Schema, model } from "mongoose"

const StudentSchema = Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        maxLength: [ 25, "El nombre tiene más de 25 caracteres" ]
    },
    surname: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        maxLength: [ 25, "El apellido tiene más de 25 caracteres" ]
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
        minLength: [ 8, "La contraseña solo puede tener minimo 8 caracteres" ]
    },
    phone: {
        type: String,
        maxLength: [ 8, "El número de teléfono solo puede tener máximo 8 caracteres" ],
        minLength: [ 8, "El número de teléfono solo puede tener minimo 8 caracteres" ],
        required: [ true, "El número de teléfono es obligatorio" ]
    },
    role: {
        type: String,
        default: "STUDENT_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

StudentSchema.methods.toJSON = function () {
    const { __v, password, _id, ...student } = this.toObject();
    student.uid = _id;
    return student;
}

export default model('Student', StudentSchema);