import { Schema, model } from "mongoose"

const TeacherSchema = Schema({
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
        default: "TEACHER_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

TeacherSchema.methods.toJSON = function () {
    const { __v, password, _id, ...teacher } = this.toObject();
    teacher.uid = _id;
    return teacher;
}

export default model('Teacher', TeacherSchema);