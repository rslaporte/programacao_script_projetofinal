//const database = require('./config/db_connect')
const bp = require('body-parser')
const app = require('express')()
const cors = require('cors')

//Routes
const fabricantes = require('./routes/fabricantes')
const produtos = require('./routes/produtos')

//Pushing the routes, cors and body-parser into server.
app.use(cors())
app.use(bp.json())
app.use('/fabricantes', fabricantes)
app.use('/produtos', produtos)

const port = 8000 

app.listen(port, () => {console.log(`Server is listening on port ${port}`)})