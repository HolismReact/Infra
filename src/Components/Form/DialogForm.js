import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormBase, Actions, app, Explanations } from '@Form';

const DialogForm = ({
    entity,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {

    const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);

    useEffect(() => {
        const onDialogFormRequested = (item) => {
            setIsDialogFormOpen(true);
        }
        app.on(app.dialogFormRequested, onDialogFormRequested)
        return () => app.removeListener(app.dialogFormRequested, onDialogFormRequested)
    }, [])

    useEffect(() => {
        const onDialogFormCanceled = (item) => {
            setIsDialogFormOpen(false);
        }
        app.on(app.dialogFormCanceled, onDialogFormCanceled)
        return () => app.removeListener(app.dialogFormCanceled, onDialogFormCanceled)
    }, [])

    return <FormBase
        entity={entity}
    >
        <Dialog
            /*dir={app.isRtl() ? "rtl" : "ltr"}*/
            open={isDialogFormOpen}
            id='dialogForm'
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth={large ? 'md' : 'sm'}
            TransitionProps={{
                onEntered: () => {
                    var firstField = document.querySelector('#dialogForm .field:first-child input');
                    if (firstField && firstField.focus) {
                        firstField.focus();
                    }
                }
            }}
        >
            <DialogTitle id="form-dialog-title">{app.t(title)}</DialogTitle>
            <DialogContent>
                <Explanations explanations={explanations} />
                <form
                    noValidate
                //onSubmit={handleSubmit}
                >
                    <div id='fields'>
                        {inputs}
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Actions
                    actions={actions}
                />
            </DialogActions>
        </Dialog>
    </FormBase>
}

export { DialogForm };