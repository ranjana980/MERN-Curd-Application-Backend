const Employee = require('../models/employee')
const Validation = require('../Validation/formValid')


const index = async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const search = req.query.search
    if (page) {
        if (limit) {
            if (search) {
                const totalCount = await Employee.find({ name: search }).count()
                Employee.find({ name: search }).skip(parseInt(req.query.page) * limit).limit(parseInt(req.query.limit))
                    .then(response => {
                        res.json({
                            code: 200,
                            msg: response,
                            total: totalCount
                        })
                    })
                    .catch(error => {
                        res.json({
                            msg: 'An error Occured'
                        })
                    })
            }
            else {
                const totalCount = await Employee.find().count()
                Employee.find().skip(parseInt(req.query.page) * limit).limit(parseInt(req.query.limit))
                    .then(response => {
                        res.json({
                            code: 200,
                            msg: response,
                            total: totalCount
                        })
                    })
                    .catch(error => {
                        res.json({
                            msg: 'An error Occured'
                        })
                    })

            }
        }
        else {
            const totalCount = await Employee.find().count()
            await Employee.find().skip(parseInt(req.query.page) * limit)
                .then(response => {
                    res.json({
                        code: 200,
                        msg: response,
                        total: totalCount
                    })
                })
                .catch(error => {
                    res.json({
                        msg: 'An error Occured'
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
                    msg: response,
                    total: totalCount
                })
            })
            .catch(error => {
                res.json({
                    msg: 'An error Occured'
                })
            })
    }
}

const show = (req, res) => {
    console.log('idd')
    let employeeID = req.params.id
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                code: 200,
                msg: response
            })
        })
        .catch(error => {
            res.json({
                msg: 'An error Occured!'
            })

        })
}

const store = (req, res) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    })

    if (Validation.bodyValid(req.body) == true) {
        employee.save()
            .then(response => {
                res.json({
                    code: 200,
                    msg: "Employee Added Successfully"
                })
            })
            .catch(error => {
                res.json({
                    msg: error
                })
            })
    }
    else {
        res.json({
            code: 202,
            msg: `${Validation.bodyValid(req.body)}  Not Found`
        })
    }
}

const update = (req, res) => {
    let employeeID = req.params.id
    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    if (Validation.bodyValid(req.body) == true) {
        if (req.body.name != "" || req.body.designation != "" || req.body.email != "" || req.body.phone != "" || req.body.age) {
            Employee.findByIdAndUpdate(employeeID, { $set: updateData })
                .then(response => {
                    res.json({
                        code: 200,
                        msg: 'Empolyee Updated Successfully'
                    })
                })

        }
        else {
            res.json({
                code: 202,
                msg: `${Validation.bodyValid(req.body)}  Not Found`
            })
        }

    }
    else {
        res.json({
            code: 201,
            msg: `${Validation.IdValid(req.body)}  Not Found`
        })
    }
}

const deleteEmpolyee = (req, res) => {
    let employeeID = req.params.id
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            if (Validation.bodyValid(req.body) == true) {
                res.json({
                    code: 200,
                    msg: "Employee Deleted Succefully"
                })
            }
            else {
                res.json({
                    code: 201,
                    msg: `${Validation.IdValid(req.body)}  Not Found`
                })
            }

        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })

}

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = Employee.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = { username, email, password };
    Employee.push(newUser);

    // Generate JWT token
    const token = jwt.sign({ email }, secretKey, { expiresIn: '5h' }); // Expires in 5 hour

    res.status(201).json({ message: 'User registered successfully', token, code: 200 });

}

const signInUser = (req, res) => {
    const { email, password } = req.body;

    const user = Employee.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '5h' });

        res.json({ token });
    });
}


module.exports = {
    index, show, store, update, deleteEmpolyee, registerUser, signInUser
}