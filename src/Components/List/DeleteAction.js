import { ItemAction } from './ItemAction';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { post } from '../../Base/Api';
import app from '../../Base/App';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteAction = ({ entity, item }) => {

    const [confirmationDialogIsOpen, setConfirmationDialogVisibility] = useState(false);
    const [progress, setProgress] = useState(false);

    const deleteItem = () => {
        setConfirmationDialogVisibility(false);
        setProgress(true);
        post(`${entity}/delete/${item.id}`).then(data => {
            app.success("Item is deleted successfully");
            setProgress(false);
            app.emit(app.reloadRequested);
        }, error => {
            app.error(error);
            setProgress(false);
        });
    }

    const confirmationDialog = <Dialog
        open={confirmationDialogIsOpen}
        aria-labelledby="dialog-title"
        TransitionProps={{ onEntered: () => { } }}
    >
        <DialogTitle id="dialog-title">Confirmation</DialogTitle>
        <DialogContent>
            <p>
                Are you sure you want to delete this item?
            </p>
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                <Button variant="outlined" onClick={() => setConfirmationDialogVisibility(false)}>
                    No
                </Button>
                <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => {
                    deleteItem();
                }}>
                    Yes
                </Button>
            </div>
        </DialogActions>
    </Dialog>

    return <>
        {confirmationDialog}
        {
            progress
                ?
                <CircularProgress />
                :
                <ItemAction
                    icon={<DeleteIcon style={{ color: '#EF4444' }} />}
                    click={() => {
                        setConfirmationDialogVisibility(true);
                    }}
                />
        }
    </>
}

export default DeleteAction;