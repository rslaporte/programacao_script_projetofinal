const models = require('../models/Fabricante.js');

/*
    This file is responsible for controlling all operations from models in the routes. 
*/
function getAllFabricante(req, res) {
    models.getAllFabricante((err, bd_res) => {
        if(err) throw err;
        
        res.json(bd_res);
    })
}

function getFabricanteById(req, res) {
    const id = req.params.id

    if(!id) {
        res.send('You need to specify an id')
    }

    models.getFabricanteById(id, (err, bd_res) => {
        if(err) throw err;
        else res.json(bd_res);
    })
}

function updateStatus(req, res) {
    const id = req.params.id
    
    models.getFabricanteById(id, (err, bd_res) => {
        let status = bd_res[0].fab_ativoinativo
        if(err) throw err;

        if(status == 'A') status = 'I'
        else status = 'A'
    
        models.updateStatus(id, status, function(err, resActive) {
            if(err) throw err
            
            res.send(`Registro Atualizado!`).status(200)
        });
    })

}

function postFabricante(req, res) {
    const manufacturer = req.body;

    models.createFabricante(manufacturer, (err, bd_res) => {
        if (err) throw err;
        res.send('Fabricante inserido!');
    })
}

function putFabricante(req, res) {
    const manufacturer = req.body;

    models.updateFabricante(manufacturer, (err, bd_res) => {
        if (err) throw err;
        res.send('Fabricante atualizado!');
    });
}

module.exports = {
    getAllFabricante,
    getFabricanteById,
    postFabricante,
    putFabricante,
    updateStatus,
}