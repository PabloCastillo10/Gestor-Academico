import { Schema, model } from "mongoose";

const CourseModel = Schema({
    
    name: {
       type: String,
       required: true,
    },
    description: {
        type: String,
       required : true
    }
},
    { timestamps: true },
    {
        versionKey: false,
    }
)

export default model('Course', CourseModel);