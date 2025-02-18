import { Schema, model } from "mongoose";

const CourseModel = Schema({
    
    name: {
       type: String,
       required: true,
       unique: true,
    },
    description: {
        type: String,
       required : true
    },

    status: {
        type: Boolean,
        default: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
},
    { timestamps: true },
    {
        versionKey: false,
    }
)

export default model('Course', CourseModel);