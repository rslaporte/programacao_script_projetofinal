import { useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
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


//Creating the FabricanteForm Component
export default function FabricanteForm() {
    const classes = useStyles()

    //Setting the initial state for fabricante
    const [fabricante, setFabricante] = useState({
       fab_ativoinativo: 'A',
       fab_nome: '',
       fab_apelido: '',
       fab_cidade: '',
       fab_estado: '',
       fab_telefone: ''
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
        nome: '',
        apelido: '',
        cidade: '',
        estado: '',
        telefone: ''
    })

    const [isModified, setIsModified] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [title, setTitle] = useState('Cadastrar novo Fabricante')

    const history = useHistory()
    const params = useParams()

    //If its an edit form, get all values to fill the inputs
    useEffect(() => {
        if(params.id) {
            setTitle('Editar Fabricante')
            getData(params.id)    
            return
        }        
    }, [])

    //This function makes a request to database to get the information from a 'fabricante' with the given id
    async function getData(id) {
        try {
            const response = await axios.get(`http://localhost:8000/fabricantes/${id}`)

            const fabricanteTemp = {
                fab_ativoinativo: 'A',
                fab_nome: response.data[0].fab_nome,
                fab_apelido: response.data[0].fab_apelido,
                fab_cidade: response.data[0].fab_cidade,
                fab_estado: response.data[0].fab_estado,
                fab_telefone: response.data[0].fab_telefone
            }

            setFabricante(fabricanteTemp)
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
        const fabricanteTemp = {...fabricante}

        if(event.target.id) property = event.target.id

        fabricanteTemp[property] = event.target.value        
        
        setFabricante(fabricanteTemp)
        setIsModified(true)

        validate(fabricanteTemp)
    }

    //Validate the entered data
    function validate(data) {
        let isValid = true

        const errorTemp = {
            nome: '',
            apelido: '',
            cidade: '',
            estado: '',
            telefone: ''
        }
        
        if(data.fab_nome.trim() === '' || data.fab_nome.length > 30) {
            errorTemp.nome = 'O nome deve ser preenchido e possuir até 30 caracteres'
            isValid = false
        }

        if(data.fab_apelido.trim() === '' || data.fab_apelido.length > 20) {
            errorTemp.apelido = 'O apelido deve ser preenchido e possuir até 20 caracteres'
            isValid = false
        }

        if(data.fab_cidade.trim() === '' || data.fab_cidade.length > 20) {
            errorTemp.cidade = 'A cidade deve ser preenchida e possuir até 20 caracteres'
            isValid = false
        }

        if(data.fab_estado.trim() === '' || data.fab_estado.length > 2) {
            errorTemp.estado = 'O estado deve ser preenchido e possuir até 2 caracteres'
            isValid = false
        }

        if(data.fab_telefone.trim() === '' || data.fab_telefone.length > 10) {
            errorTemp.telefone = 'O telefone deve ser preenchido e possuir até 10 caracteres'
            isValid = false
        }

        setError(errorTemp)
        return isValid
    }

    //Save all data on database (can be a post or put request, depending if the user is creating or editing a 'fabricante')
    async function saveData() {
        try{
            setSendBtnStatus({disabled: true, label: 'Enviando...'})
            
            if(params.id) {
                const sendFabricante = {...fabricante, fab_codigo: params.id}
                await axios.put(`http://localhost:8000/fabricantes`, sendFabricante)

            }
            
            else await axios.post('http://localhost:8000/fabricantes', fabricante)     

            setSbStatus({open: true, severity: 'success', message: 'Dados salvos com sucesso'})     
        }
        catch(error) {
            setSbStatus({open: true, severity: 'error', message: 'ERRO: ' + error.message})
        }  

        setSendBtnStatus({disabled: false, label: 'Enviar'})
    }

    function handleSubmit(event) {
        event.preventDefault()        
        if(validate(fabricante)) saveData()
    }

    function handleSbClose() {
        setSbStatus({...sbStatus, open: false})
        if(sbStatus.severity === 'success') history.push('/fabricantes')
    }

    function handleDialogClose(result) {
        setDialogOpen(false)        
        if(result) history.push('/fabricantes')
    }

    function handleGoBack() {
        if(isModified) setDialogOpen(true)
        else history.push('/fabricantes')
    }

    return(
        <>
            {console.log(fabricante)}
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
                    id="fab_nome" 
                    label="Nome" 
                    variant="filled"
                    value={fabricante.fab_nome} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe o nome do fabricante"
                    fullWidth
                    error={error.nome !== ''}
                    helperText={error.nome}
                />

                <TextField 
                    id="fab_apelido" 
                    label="Apelido" 
                    variant="filled"
                    value={fabricante.fab_apelido} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe o apelido do fabricante"
                    fullWidth
                    error={error.apelido !== ''}
                    helperText={error.apelido}
                />

                <TextField 
                    id="fab_cidade" 
                    label="Cidade" 
                    variant="filled"
                    value={fabricante.fab_cidade} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe a cidade do fabricante"
                    fullWidth
                    helperText={error.cidade}
                />      

                <TextField 
                    id="fab_estado" 
                    label="Estado" 
                    variant="filled"
                    value={fabricante.fab_estado} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe o estado do fabricante"
                    fullWidth
                    helperText={error.estado}
                />      

                <TextField 
                    id="fab_telefone" 
                    label="Telefone" 
                    variant="filled"
                    value={fabricante.fab_telefone} 
                    onChange={handleInputChange}
                    required 
                    placeHolder="Informe o telefone do fabricante"
                    fullWidth
                    error={error.telefone !== ''}
                    helperText={error.telefone}
                />
                
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