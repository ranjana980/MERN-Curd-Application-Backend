const yup = require('yup');

const signUpSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const IdValid = (body) => {
    if (body.employeeID === "") {
        return "employeeID"
    }
    else if (body.employeeID === null) {
        return "employeeID"
    }
    else if (body.employeeID === undefined) {
        return "employeeID"
    }

    else {
        return true
    }

}

module.exports = { signUpSchema, IdValid }