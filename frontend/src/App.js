import './App.css'

import Index from './Components/Index/Index'
import FabricanteList from './Components/Forms/FabricanteList'
import FabricanteForm from './Components/Forms/FabricanteForm';
import ProdutoList from './Components/Forms/ProdutoList';
import ProdutoForm from './Components/Forms/ProdutoForm';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import TopMenu from './Components/TopMenu/TopMenu'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import FooterBar from './ui/FooterBar'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[900],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: '42px',
    minHeight: '100vh'
  },
  routed: {
    padding: '25px',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  }
}))

function Main() {
  const classes = useStyles()

  return(
    <Box className={classes.main}>
      <BrowserRouter> {/* Troca dinâmica de elementos */}
          <Box id="routed" className={classes.routed}>
            <TopMenu />
            <Switch> {/* Determina qual elemento será exibido */}
              <Route exact path='/'>
                    <Index />                
              </Route>

              <Route exact path='/produtos'>
                    <ProdutoList />                
              </Route>

              <Route exact path='/produtos/new'>
                    <ProdutoForm />                
              </Route>

              <Route exact path='/produtos/edit/:id'>
                    <ProdutoForm />                
              </Route>

              <Route exact path='/fabricantes'>
                    <FabricanteList />                
              </Route>

              <Route exact path='/fabricantes/new'>
                    <FabricanteForm />                
              </Route>

              <Route exact path='/fabricantes/edit/:id'>
                    <FabricanteForm />                
              </Route>
            </Switch>
          </Box>        
      </BrowserRouter>    
    </Box>   
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Main />
    </ThemeProvider>
  )
}

export default App;
