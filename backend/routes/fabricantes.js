const express = require('express')
const router = express.Router()

const controller = require('../controller/fabricanteController.js');

//Creating all routes for 'fabricantes'
router.get('/', controller.getAllFabricante)
router.get('/:id', controller.getFabricanteById)
router.post('/' , controller.postFabricante)
router.put('/', controller.putFabricante)
router.put('/status/:id', controller.updateStatus)

module.exports = router