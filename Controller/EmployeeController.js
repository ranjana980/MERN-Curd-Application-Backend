
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const Validation = require('../Validation/form-validation')
const Employee = require('../models/employees')

const index = async (req, res) => {
    const { page, limit, search } = req.query
    try {
        if (page) {
            if (limit) {
                if (search) {
                    const totalCount = await Employee.find({ name: search }).count()
                    Employee.find({ name: search }).skip(parseInt(page) * limit).limit(parseInt(limit))
                        .then(response => {
                            res.status(200).json({
                                code: 200,
                                data: response,
                                total: totalCount
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error Occured'
                            })
                        })
                }
                else {
                    const totalCount = await Employee.find().count()
                    Employee.find().skip(parseInt(page) * limit).limit(parseInt(limit))
                        .then(response => {
                            res.json({
                                code: 200,
                                data: response,
                                total: totalCount
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error Occured'
                            })
                        })
                }
            }
            else {
                const totalCount = await Employee.find().count()
                await Employee.find().skip(parseInt(page) * limit)
                    .then(response => {
                        res.json({
                            code: 200,
                            data: response,
                            total: totalCount
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'An error Occured'
                        })
                    })
            }
        }
        else {
            const totalCount = await Employee.find().count()
            await Employee.find()
                .then(response => {
                    res.json({
                        code: 200,
                        data: response,
                        total: totalCount
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error Occured'
                    })
                })
        }
    }
    catch (err) {
        res.status(400).json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}

const show = (req, res) => {
    let employeeID = req.params.id
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                code: 200,
                message: response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })

        })
}

const update = (req, res) => {
    let employeeID = req.params.id
    const { designation, phone, age } = req.body
    let updateData = {
        designation,
        phone,
        age
    }
    Employee.findByIdAndUpdate(employeeID, { $set: updateData })
        .then(response => {
            res.json({
                code: 200,
                message: 'Empolyee Updated Successfully'
            })
        })
}

const deleteEmpolyee = (req, res) => {
    let employeeID = req.params.id
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            if (Validation.bodyValid(req.body) === true) {
                res.json({
                    code: 200,
                    message: "Employee Deleted Succefully"
                })
            }
            else {
                res.json({
                    code: 201,
                    message: `${Validation.IdValid(req.body)}  Not Found`
                })
            }

        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })

}

const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    await Validation.signUpSchema.validate({ username, email, password, confirmPassword }).then(async () => {
        try {
            const existinguser = await Employee.findOne({ email: email })
            if (existinguser) {
                res.json({
                    code: 201,
                    message: "User Already Exist!"
                })
            }
            else {
                const hashPassword = await crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); // Hash the password
                const token = jwt.sign({ email }, 'secret', { expiresIn: '5h' });
                await Employee.create({
                    username,
                    email,
                    password: hashPassword,
                    token,
                    shortenUrl: []
                })
                res.json({
                    code: 200,
                    message: 'SignUp Successfully',
                    token
                })
            }
        }
        catch (err) {
            res.json({
                code: 400,
                msg: 'somthing went wrong'
            })
        }
    })
        .catch(error => console.error(error.message));

}

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email: email });
    try {
        if (!user) {
            return res.json({ error: 'User not found' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.json({ error: 'Invalid email or password' });
            }
            const token = jwt.sign({ id: user._id, username: user.username }, 'secret', { expiresIn: '5h' });
            res.json({ token, code: 200, message: 'Sign In Successfully!' });
        });
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }

}

const deleteshortenUrl = (req, res) => {
    let employeeID = req.params.id

    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            if (Validation.bodyValid(req.body) === true) {
                res.json({
                    code: 200,
                    message: "Employee Deleted Succefully"
                })
            }
            else {
                res.json({
                    code: 201,
                    message: `${Validation.IdValid(req.body)}  Not Found`
                })
            }

        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })

}

const addShortenUrl = (req, res) => {

}

const getShortenUrl = (req, res) => {
    let employeeID = req.params.id
    
    Employee.findByIdAndRemove(employeeID).then((response) => {
        res.json({
            code: 200,
            shortenUrls: response?.shortenUrl
        })
    })
}

module.exports = {
    index, show, update, deleteEmpolyee, signInUser, registerUser, deleteshortenUrl,
    addShortenUrl, getShortenUrl
}