import { makeStyles } from '@material-ui/styles'
import { React, useState } from 'react'

const useStyles = makeStyles({
    container: {
        display: 'block',
        justifyContent: 'center'     
    },
    title: {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2%' 
    }

})

export default function Index() {
    const classes = useStyles()

    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.title}> Sobre o projeto: </h1>
                <p className={classes.text}> Este é um projeto realizado para a disciplina 'Programação Script' ministrada no segundo semestre de 2021. </p>
                <p className={classes.text}> Professor: Antônio Clementino Neto</p>  
                <p className={classes.text}> Autor: Rafael Sobrinho Laporte</p>  
            </div>
        </>
    )
}