const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    designation: {
        type: String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    age:{
        type:Number
    }
},{timestamps:true});
const Employee=mongoose.model("Employee",employeeSchema)
module.exports = Employee