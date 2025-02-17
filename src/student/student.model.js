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
            maxLength: [ 25,  ]
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
            minLength: [ 8,  ]
        },
        phone: {
            type: String,
            maxLength: [ 8,  ],
            minLength: [ 8, ],
            required: [ true,  ]
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