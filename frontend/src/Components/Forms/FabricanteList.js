import {useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Using makeStyles to generate the css
const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex', 
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '5%'
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        '& button': {
            visibility: 'hidden'
        },
        '&:hover button': {
            visibility: 'visible'
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    toolbar: {
            justifyContent: 'flex-end',
            paddingRight: 0,
            margin: theme.spacing(2,0)
    }
}));

//Creating the FabricanteList Component
export default function FabricanteList() {
    const classes = useStyles()
    
    const [fabricante, setFabricante] = useState([])   
    const [status, setStatus] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sbOpen, setSbOpen] = useState(false)
    const [sbSeverity, setSbSeverity] = useState('success')
    const [sbMessage, setSbMessage] = useState('Exclusão realizada com sucesso.')

    const history = useHistory()

    //Populating the table
    useEffect(() => {
        getData()
    }, [])

    //Getting values from database to populate the table
    async function getData() {
        try {
            const url = 'http://localhost:8000/fabricantes'
            let response = await axios.get(url)
            if (response.data.length > 0 ) setFabricante(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    //Updating the status (active -> inactive or inactive -> active)
    async function changeStatus() {
        try {
            const url = `http://localhost:8000/fabricantes/status/${status}`
            await axios.put(url)
            
            getData()
            setSbSeverity('success')
            setSbMessage('Inativação efetuada com sucesso.')
        
        }
        catch(error) {
            setSbSeverity('error')
            setSbMessage(`Erro: ` + error.message)
        }

        setSbOpen(true)
    }
    
    function handleDialogClose(result) {
        setDialogOpen(false)
        setStatus(undefined)

        if(result) changeStatus()
    }

    function handleDelete(id) {
        setStatus(id)
        setDialogOpen(true)
    }

    function handleSbClose() {
        setSbOpen(false)
    }

    return(
        <>
            <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Deseja realmente alterar o status desse fabricante?
            </ConfirmDialog>

            <Snackbar open={sbOpen} autoHideDuration={6000} onClose={handleSbClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSbClose} severity={sbSeverity} >
                    {sbMessage}
                </MuiAlert>
            </Snackbar>

            <h1 className={classes.title}>Listagem de Fabricantes</h1>
            <Toolbar className={classes.toolbar}>
                <Button color='secondary' variant='contained' size='large' startIcon={<AddBoxIcon />} onClick={() =>  history.push('/fabricantes/new') }>
                    Novo Fabricante                
                </Button>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Código</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Nome</TableCell>
                            <TableCell align='center'>Apelido</TableCell>
                            <TableCell align='center'>cidade</TableCell>
                            <TableCell align='center'>Estado</TableCell>
                            <TableCell align='center'>Telefone</TableCell>
                            <TableCell align='center'>Editar</TableCell>
                            <TableCell align='center'>Ativar/Desativar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {fabricante.map((fabricante) => (
                        <TableRow key={fabricante.fab_codigo} className={classes.tableRow}>
                            <TableCell align='center'>{fabricante.fab_codigo}</TableCell>
                            <TableCell align='center'>{fabricante.fab_ativoinativo}</TableCell>
                            <TableCell align='center'>{fabricante.fab_nome}</TableCell>
                            <TableCell align='center'>{fabricante.fab_apelido}</TableCell>
                            <TableCell align='center'>{fabricante.fab_cidade}</TableCell>
                            <TableCell align='center'>{fabricante.fab_estado}</TableCell>
                            <TableCell align='center'>{fabricante.fab_telefone}</TableCell>                         
                            <TableCell align='center'>
                                <IconButton aria-label='editar' onClick={() => history.push(`/fabricantes/edit/${fabricante.fab_codigo}` )}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align='center'>
                                <IconButton aria-label='excluir' onClick={() => handleDelete(fabricante.fab_codigo)}>
                                    <SyncAltIcon color='error' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
