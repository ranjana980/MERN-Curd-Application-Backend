const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    username: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    age: {
        type: Number
    },
    password: {
        type: String
    }
}, { timestamps: true });
const Employee = mongoose.model("Employees", employeeSchema)
module.exports = Employee