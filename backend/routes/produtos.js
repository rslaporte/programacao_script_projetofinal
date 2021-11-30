const express = require('express')
const router = express.Router()

const controller = require('../controller/produtoController.js');

//Creating all routes for 'produtos'
router.get('/', controller.getAllProduto)
router.get('/:id', controller.getProdutoById)
router.post('/', controller.postProduto)
router.put('/', controller.putProduto)
router.put('/status/:id', controller.updateStatus)

module.exports = router