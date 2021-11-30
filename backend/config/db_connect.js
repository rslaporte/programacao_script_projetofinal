const mysql = require('mysql2')
const databaseName = 'dados212d'

//Creating the database connection
const database =  mysql.createConnection({
    user: 'root',
    password: 'password',
    host: 'localhost',
    port: '3306',
    database: databaseName
})

database.connect((err) => {
    if(err) {
        console.log('Cannot connect to the database', err)
        return  
    }
    else {
        console.log(`Connected to database: ${databaseName}`)       
    }
})

module.exports = database
