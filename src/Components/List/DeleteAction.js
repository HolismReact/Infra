import { ItemAction } from './ItemAction';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { post } from '../../Base/Api';
import Holism from '../../Base/Holism';
import CircularProgress from '@material-ui/core/CircularProgress';

const DeleteAction = ({ entity, item }) => {

    const [confirmationDialogIsOpen, setConfirmationDialogVisibility] = useState(false);
    const [progress, setProgress] = useState(false);

    const deleteItem = () => {
        setProgress(true);
        post(`${entity}/delete/${item.id}`).then(data => {
            Holism.success("Item is deleted successfully");
            setProgress(false);
            Holism.emit(Holism.reloadRequirement);
        }, error => {
            Holism.error(error);
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
                    icon={<DeleteIcon />}
                    click={() => {
                        setConfirmationDialogVisibility(true);
                    }}
                />
        }
    </>
}

export default DeleteAction;