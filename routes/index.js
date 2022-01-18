const express = require('express')
const router = express.Router()

router.use('/devices',require('./routes'))

module.exports=router