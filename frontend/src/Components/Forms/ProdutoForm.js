import { useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'

//Using makeStyles to generate the css
const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex', 
        justifyContent: 'center'
    },
    form: {
        backgroundColor: '',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        maxWidth: '50%',
        margin: '5% auto',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            margin: '0 24px 24px 0'
        }
    },
    toolbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: '36px',
    },
    formInput: {
        display: 'flex',
        margin: '0 0 0 500px',
        justifyContent: 'center'
    }
}))

//Creating the ProdutoForm Component
export default function ProdutoForm() {
    const classes = useStyles()

    //Setting the initial state for 'produto'
    const [produto, setProduto] = useState({
       pro_ativoinativo: 'A',
       pro_descricao: '',
       pro_validade: '',
       pro_especie: '',
       fab_codigo: ''
    })

    //Setting the state of the 'Enviar' button
    const [sendBtnStatus, setSendBtnStatus] = useState({
        disabled: false,
        label: 'Enviar  '
    })

    //Setting the state from the severity message button
    const [sbStatus, setSbStatus] = useState({
        open: false,
        severity: 'success',
        message: ''
    })

    //Setting the state from input errors controller
    const [error, setError] = useState({
        descricao: '',
        validade: '',
        especie: '',
        codigo: ''
    })

    const [isModified, setIsModified] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [title, setTitle] = useState('Cadastrar novo Produto')
    const [fabricantesId, setFabricantesId] = useState([])

    const history = useHistory()
    const params = useParams()

    //If its a edit form, get all values to fill the inputs
    useEffect(() => {
        getFabricantesId()

        if(params.id) {
            setTitle('Editar Produto')
            getData(params.id)    
            return
        }        
    }, [])

    //This function makes a request to database to get the information from all 'fabricantes'. It will be used to input the FK Key on input forms
    async function getFabricantesId() {
        try{
            let fabricantesId = []

            const response = await axios.get(`http://localhost:8000/fabricantes`)
            response.data.forEach(fabricante => {
                fabricantesId.push(fabricante.fab_codigo)
            })

            setFabricantesId(fabricantesId)
        }
        catch(error) {
            setSbStatus({
                open: true,
                severity: 'error',
                message: 'Não foi possível carregar os dados para edição.'
            })
        }
    }

    //This function makes a request to database to get the information from a 'produto' with the given id
    async function getData(id) {
        try {
            const response = await axios.get(`http://localhost:8000/produtos/${id}`)

            const produtoTemp = {
                pro_ativoinativo: 'A',
                pro_descricao: response.data[0].pro_descricao,
                pro_validade: response.data[0].pro_validade,
                pro_especie: response.data[0].pro_especie,
                fab_codigo: response.data[0].fab_codigo,
            }

            setProduto(produtoTemp)
            return
        }

        //If the request has failed, open the severity box to show the error
        catch(error) {
            setSbStatus({
                open: true,
                severity: 'error',
                message: 'Não foi possível carregar os dados para edição.'
            })
        }
    }

    //Handle changes on the input field
    function handleInputChange(event, property) {
        const produtoTemp = {...produto}

        if(event.target.id) property = event.target.id
        produtoTemp[property] = event.target.value        
        
        setProduto(produtoTemp)
        setIsModified(true)

        validate(produtoTemp)
    }

    //Validate the entered data
    function validate(data) {
        let isValid = true

        const errorTemp = {
            descricao: '',
            validade: '',
            especie: '',
            codigo: ''
        }
        
        if(data.pro_descricao.trim() === '' || data.pro_descricao.length > 10) {
            errorTemp.descricao = 'A descrição deve ser preenchido e possuir até 10 caracteres'
            isValid = false
        }

        if(data.pro_validade.trim() === '' || data.pro_validade.length > 5) {
            errorTemp.validade = 'A validade deve ser preenchido e possuir até 5 caracteres (MM/AA)'
            isValid = false
        }

        if(data.pro_especie.trim() === '' || data.pro_especie.length > 15) {
            errorTemp.cidade = 'A espécie deve ser preenchida e possuir até 15 caracteres'
            isValid = false
        }

        if(data.fab_codigo.toString().trim() === '') {
            errorTemp.codigo = 'O codigo do fabricante deve ser preenchido'
            isValid = false
        }

        setError(errorTemp)
        return isValid
    }

    //Save all data on database (can be a post or put request, depending if the user is creating or editing a 'produto')
    async function saveData() {
        try{
            setSendBtnStatus({disabled: true, label: 'Enviando...'})
            
            if(params.id) {
                const sendProduct = {...produto, pro_codigo: params.id}
                await axios.put(`http://localhost:8000/produtos`, sendProduct)

            }
            
            else await axios.post('http://localhost:8000/produtos', produto)     

            setSbStatus({open: true, severity: 'success', message: 'Dados salvos com sucesso'})     
        }
        catch(error) {
            setSbStatus({open: true, severity: 'error', message: 'ERRO: ' + error.message})
        }  

        setSendBtnStatus({disabled: false, label: 'Enviar'})
    }

    function handleSubmit(event) {
        event.preventDefault()        
        if(validate(produto)) saveData()
    }

    function handleSbClose() {
        setSbStatus({...sbStatus, open: false})
        if(sbStatus.severity === 'success') history.push('/produtos')
    }

    function handleDialogClose(result) {
        setDialogOpen(false)        
        if(result) history.push('/produtos')
    }

    function handleGoBack() {
        if(isModified) setDialogOpen(true)
        else history.push('/produtos')
    }

    return(
        <>
            <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Há dados não salvos. Deseja realmente voltar?
            </ConfirmDialog>

            <Snackbar open={sbStatus.open} autoHideDuration={6000} onClose={handleSbClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbStatus.severity} >
                    {sbStatus.message}
                </MuiAlert>
            </Snackbar>

            <h1 className={classes.title}>{title}</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField 
                    id="pro_descricao" 
                    label="Descrição" 
                    variant="filled"
                    value={produto.pro_descricao} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe a bandeira do cartão"
                    fullWidth
                    error={error.descricao !== ''}
                    helperText={error.descricao}
                />

                <TextField 
                    id="pro_validade" 
                    label="Validade" 
                    variant="filled"
                    value={produto.pro_validade} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe a validade do cartao"
                    fullWidth
                    error={error.validade !== ''}
                    helperText={error.validade}
                />

                <TextField 
                    id="pro_especie" 
                    label="Espécie" 
                    variant="filled"
                    value={produto.pro_especie} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe a espécie do produto"
                    fullWidth
                    error={error.especie !== ''}
                    helperText={error.especie}
                />      

                <TextField 
                    id="fab_codigo" 
                    label="Código do Fabricante" 
                    variant="filled"
                    value={produto.fab_codigo.toString()} 
                    onChange={event => handleInputChange(event, 'fab_codigo')}
                    required 
                    placeHolder="Informe a o código do fabricante"
                    select
                    fullWidth
                >      
                    { fabricantesId.map(id => <MenuItem value={id}>{id}</MenuItem> )}
                </TextField>

                <Toolbar className={classes.toolbar}>
                    <Button type="submit" variant="contained" color="secondary" disabled={sendBtnStatus.disabled}>
                        {sendBtnStatus.label}
                    </Button>
                    <Button variant="contained" onClick={handleGoBack}>Voltar</Button>
                </Toolbar>
            </form>
        </>        
    )
}