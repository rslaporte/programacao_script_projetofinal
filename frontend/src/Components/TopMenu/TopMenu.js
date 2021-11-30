import { React } from 'react'
import './TopMenu.css'
import { Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function TopMenu() {
    const history = useHistory()

    return (
        <Toolbar className='headerMenu'>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Wellfleet&display=swap" rel="stylesheet"/>
            <button className='header-button' onClick={() => {history.push('/')}}>Home</button>
            <button className='header-button' onClick={() => {history.push('/fabricantes')}}>Fabricantes</button>
            <button className='header-button' onClick={() => {history.push('/produtos')}}>Produtos</button>            
        </Toolbar>
    )
}