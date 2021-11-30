const models = require('../models/Produto.js');

/*
    This file is responsible for controlling all operations from models in the routes. 
*/
function getAllProduto(req, res) {
    models.getAllProduto((err, bd_res) => {
        if(err) throw err;
        
        res.json(bd_res);
    })
}

function getProdutoById(req, res) {
    const id = req.params.id

    if(!id) {
        res.send('You need to specify an id')
    }

    models.getProdutoById(id, (err, bd_res) => {
        if(err) throw err;
        else res.json(bd_res);
    })
}

function updateStatus(req, res) {
    const id = req.params.id
    
    models.getProdutoById(id, (err, bd_res) => {
        let status = bd_res[0].pro_ativoinativo
        if(err) throw err;

        if(status == 'A') status = 'I'
        else status = 'A'
    
        models.updateStatus(id, status, function(err, resActive) {
            if(err) throw err
            
            res.send("Registro atualizado!").status(200)
        });
    })

}

function postProduto(req, res) {
    const product = req.body;

    models.createProduto(product, (err, bd_res) => {
        if (err) throw err;
        res.send('Produto inserido!');
    })
}

function putProduto(req, res) {
    const product = req.body;

    models.updateProduto(product, (err, bd_res) => {
        if (err) throw err;
        res.send('Produto atualizado!');
    });
}

module.exports = {
    getAllProduto,
    getProdutoById,
    updateStatus,
    postProduto,
    putProduto,
}