const database = require('../config/db_connect')

//It gets all 'fabricantes' from the database
function getAllFabricante(callback) {
    database.query('select * from fabricante', callback)
}

//It gets the 'fabricantes' by their id
function getFabricanteById(id, callback) {
    database.query(`select * from fabricante WHERE fab_codigo=${id}`, callback)
}

//It updates the status of the 'fabricante'
function updateStatus(id, status, callback) { 
    //If the status is not 'A' (active) or 'I' (inactive) it does nothing
    if(!['A', 'I'].includes(status)) {
        console.log('Invalid Status')
        return
    }

    const query = `update fabricante set fab_ativoinativo = '${status}' where fab_codigo = '${id}'`
    database.query(query, callback);    

    console.log(`Changing the status: Fabricante: ${id} - New Status: ${status}`)
}

//It creates a 'fabricante' on database
function createFabricante(manufacturer, callback) {
    const msql = 'INSERT INTO fabricante SET ? ';
	database.query(msql, manufacturer, callback);
}

//It updates a 'fabricante' with the given id in the database
function updateFabricante(manufacturer, callback) {
    const msql = "UPDATE fabricante SET fab_ativoinativo = '" + manufacturer.fab_ativoinativo + 
    "' , fab_nome      = '" + manufacturer.fab_nome +    
    "' , fab_apelido         = '" + manufacturer.fab_apelido +  
    "' , fab_cidade     = '" + manufacturer.fab_cidade + 
    "' , fab_estado      = '" + manufacturer.fab_estado + 
    "' , fab_telefone     = '" + manufacturer.fab_telefone + 
    "'  WHERE fab_codigo  = '" + manufacturer.fab_codigo + "'";
    
    database.query(msql, callback);
}

module.exports = {
    getAllFabricante,
    getFabricanteById,
    createFabricante,
    updateFabricante,
    updateStatus
}