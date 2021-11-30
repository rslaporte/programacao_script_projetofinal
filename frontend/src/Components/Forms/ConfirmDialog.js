import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles' 
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles(theme => ({
    dialogContent: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    warningIcon: {
        color: red[500],
        marginRight: theme.spacing(2)
    }
}));

//ConfirmDialog, used the confirm actions on the forms
export default function ConfirmDialog({title = 'Confirmar', isOpen = false, onClose, children}) {
  const classes = useStyles()

  const handleClose = (result) => {
    onClose(result)
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <WarningIcon className={classes.warningIcon} fontSize="large" />
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}