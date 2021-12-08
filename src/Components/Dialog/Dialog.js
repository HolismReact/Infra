import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { app } from '../List/List';

const Dialog = ({
    title,
    content,
    actions,
    small
}) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialogTitle"
        id="dialog"
        fullWidth
        maxWidth={small}
        TransitionProps={{
            onEntered: () => {
                var firstField = document.querySelector('#dialogForm .field:first-child input');
                if (firstField && firstField.focus) {
                    firstField.focus();
                }
            }
        }}
    >
        <DialogTitle id="dialogTitle">{app.t(title)}</DialogTitle>
        <DialogContent>
            {
                typeof content === 'string'
                    ?
                    <DialogContentText id="dialogContent">
                        {content}
                    </DialogContentText>
                    :
                    conten
            }
        </DialogContent>
        <DialogActions>
            {
                actions
                    ?
                    actions
                    :
                    <>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </>
            }
        </DialogActions>
    </Dialog>
}

export default Dialog;