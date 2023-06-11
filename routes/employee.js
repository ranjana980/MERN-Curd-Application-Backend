const express = require('express')
const router = express.Router()
const EmployeeController = require('../Controller/EmployeeController')
router.get('/', EmployeeController.index)
router.get('/show/:id', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update/:id', EmployeeController.update)
router.delete('/delete/:id', EmployeeController.deleteEmpolyee)
module.exports = router