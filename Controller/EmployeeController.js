const Employee = require('../models/employee.js')
const Validation = require('../Validation/formValid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const index = async (req, res) => {
    const { page, limit, search } = req.query
    res.json({
        code: 200,
        message: 'success'
    })
    // try {
    //     if (page) {
    //         if (limit) {
    //             if (search) {
    //                 const totalCount = await Employee.find({ name: search }).count()
    //                 Employee.find({ name: search }).skip(parseInt(page) * limit).limit(parseInt(limit))
    //                     .then(response => {
    //                         res.status(200).json({
    //                             code: 200,
    //                             data: response,
    //                             total: totalCount
    //                         })
    //                     })
    //                     .catch(error => {
    //                         res.json({
    //                             message: 'An error Occured'
    //                         })
    //                     })
    //             }
    //             else {
    //                 const totalCount = await Employee.find().count()
    //                 Employee.find().skip(parseInt(page) * limit).limit(parseInt(limit))
    //                     .then(response => {
    //                         res.json({
    //                             code: 200,
    //                             data: response,
    //                             total: totalCount
    //                         })
    //                     })
    //                     .catch(error => {
    //                         res.json({
    //                             message: 'An error Occured'
    //                         })
    //                     })
    //             }
    //         }
    //         else {
    //             const totalCount = await Employee.find().count()
    //             await Employee.find().skip(parseInt(page) * limit)
    //                 .then(response => {
    //                     res.json({
    //                         code: 200,
    //                         data: response,
    //                         total: totalCount
    //                     })
    //                 })
    //                 .catch(error => {
    //                     res.json({
    //                         message: 'An error Occured'
    //                     })
    //                 })
    //         }
    //     }
    //     else {
    //         const totalCount = await Employee.find().count()
    //         await Employee.find()
    //             .then(response => {
    //                 res.json({
    //                     code: 200,
    //                     data: response,
    //                     total: totalCount
    //                 })
    //             })
    //             .catch(error => {
    //                 res.json({
    //                     message: 'An error Occured'
    //                 })
    //             })
    //     }
    // }
    // catch (err) {
    //     res.status(400).json({
    //         code: 400,
    //         msg: 'somthing went wrong'
    //     })
    // }
}

// const show = (req, res) => {
//     let employeeID = req.params.id
//     Employee.findById(employeeID)
//         .then(response => {
//             res.json({
//                 code: 200,
//                 message: response
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'An error Occured!'
//             })

//         })
// }


// const update = (req, res) => {
//     let employeeID = req.params.id
//     const { designation, phone, age } = req.body
//     let updateData = {
//         designation,
//         phone,
//         age
//     }
//     Employee.findByIdAndUpdate(employeeID, { $set: updateData })
//         .then(response => {
//             res.json({
//                 code: 200,
//                 message: 'Empolyee Updated Successfully'
//             })
//         })
// }

// const deleteEmpolyee = (req, res) => {
//     let employeeID = req.params.id
//     Employee.findByIdAndRemove(employeeID)
//         .then(() => {
//             if (Validation.bodyValid(req.body) === true) {
//                 res.json({
//                     code: 200,
//                     message: "Employee Deleted Succefully"
//                 })
//             }
//             else {
//                 res.json({
//                     code: 201,
//                     message: `${Validation.IdValid(req.body)}  Not Found`
//                 })
//             }

//         })
//         .catch(error => {
//             res.json({
//                 message: 'An error Occured'
//             })
//         })

// }

// const registerUser = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
//     try {
//         const existinguser = await Employee.findOne({ email: email })
//         if (existinguser) {
//             res.status(201).json({
//                 code: 201,
//                 message: "User Already Exist!"
//             })
//         }
//         else {
//             const userNo = Math.floor(Math.random() * 100);
//             const username = `${firstName?.toLowerCase(/\s/g, '').replace()}${lastName ? lastName?.toLowerCase().replace(/\s/g, '') : ''}${userNo}`;
//             const hashPassword = await bcrypt.hash(password, 10);
//             const token = jwt.sign({ email }, 'secret', { expiresIn: '5h' });
//             const result = await Employee.create({
//                 username,
//                 designation: '',
//                 email,
//                 phone: '',
//                 age: '',
//                 password: hashPassword,
//                 token
//             })
//             res.status(200).json({
//                 code: 200,
//                 message: 'SignUp Successfully',
//                 data: result,
//                 token: token
//             })
//         }
//     }
//     catch (err) {
//         res.status(400).json({
//             code: 400,
//             msg: 'somthing went wrong'
//         })
//     }
// }


// const signInUser = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await Employee.findOne({ email: email });
//     try {
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         bcrypt.compare(password, user.password, (err, result) => {
//             if (err || !result) {
//                 return res.status(401).json({ error: 'Invalid email or password' });
//             }
//             const token = jwt.sign({ id: user._id, username: user.username }, 'secret', { expiresIn: '5h' });
//             res.status(200).json({ token, code: 200, message: 'Sign In Successfully!' });
//         });
//     }
//     catch (err) {
//         console.log(err, 'errror')
//         res.status(400).json({
//             code: 400,
//             msg: 'somthing went wrong'
//         })
//     }

// }


module.exports = {
    index
}