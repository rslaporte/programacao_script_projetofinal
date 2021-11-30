const database = require('../config/db_connect')

//It gets all 'produtos' from the database
function getAllProduto(callback) {
    database.query('select * from produto', callback)
}

//It gets the 'produtos' by their id
function getProdutoById(id, callback) {
    database.query(`select * from produto WHERE pro_codigo=${id}`, callback)
}

//It updates the status of the 'produto'
function updateStatus(id, status, callback) { 
    //If the status is not 'A' (active) or 'I' (inactive) it does nothing
    if(!['A', 'I'].includes(status)) {
        console.log('Invalid Status')
        return
    }

    const query = `update produto set pro_ativoinativo = '${status}' where pro_codigo = '${id}'`
    database.query(query, callback);    

    console.log(`Changing the status: Produto: ${id} - Status: ${status}`)
}

//It creates a 'produto' on database
function createProduto(product, callback) {
    const msql = 'INSERT INTO produto SET ? ';
	database.query(msql, product, callback);
}

//It updates a 'fabricante' with the given id in the database
function updateProduto(product, callback) {
    const msql = "UPDATE produto SET pro_ativoinativo = '" + product.pro_ativoinativo + 
    "' , pro_descricao      = '" + product.pro_descricao +    
    "' , pro_validade         = '" + product.pro_validade +  
    "' , pro_especie     = '" + product.pro_especie + 
    "' , fab_codigo      = '" + product.fab_codigo + 
    "'  WHERE pro_codigo  = '" + product.pro_codigo + "'";
    
    database.query(msql, callback);
}

module.exports = {
    getAllProduto,
    getProdutoById,
    createProduto,
    updateProduto,
    updateStatus
}