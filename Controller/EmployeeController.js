const { response } = require('express')
const { validate } = require('../models/employee')
const Employee = require('../models/employee')
const Validation = require('../Validation/formValid')

const index = async (req, res) => {
    res.send('Getting data successfully')
    // const totalCount = await Employee.count()
    // if(req.body.search=="" || req.body.search==undefined ||req.body.search==null){
    //     Employee.find().skip(req.body.pageNumber*10).limit(10)
    //     .then(response => {
    //         res.json({
    //             code: 200,
    //             msg: response,
    //             total:totalCount
                
    //         })
            
    //     })
    //     .catch(error => {
    //         res.json({
    //             msg: 'An error Occured'
    //         })
    //     })
        
    // }
    // else{
    //     var list=[]
    //     var limitCount=await Employee.find({name:req.body.search}).count()
    //     var result=await Employee.find({name:req.body.search}).skip(req.body.pageNumber*10).limit(10)
    //     if(result!=null){
    //         list=(result)
    //     }
    //         res.json({
    //             code: 200,
    //             msg: list,
    //             total:limitCount 
    //         })
    // }
   
}

const show = (req, res) => {
    let employeeID = req.body.employeeID
    if (Validation.IdValid(req.body) == true) {
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
    else {
        res.json({
            code: 201,
            msg: `${Validation.IdValid(req.body)}  Not Found` 
        })
    }
}

const store = (req, res) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    })

    if(Validation.bodyValid(req.body)==true ){
        employee.save()
        .then(response => {
            res.json({
                code: 200,
                msg: "Employee Added Successfully"
            })
        })
        .catch(error => {
            res.json({
                msg: 'An error Occured!'
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
    let employeeID = req.body.employeeID
    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    if (Validation.bodyValid(req.body)==true) {
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
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            if (Validation.bodyValid(req.body)==true) {
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
module.exports = {
    index, show, store, update, deleteEmpolyee
}