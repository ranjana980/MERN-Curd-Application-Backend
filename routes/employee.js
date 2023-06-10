const express = require('express')
const router = express.Router()
const EmployeeController = require('../Controller/EmployeeController')
router.get('/', EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.deleteEmpolyee)
module.exports = router