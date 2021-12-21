import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Actions, app } from '@Form';

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
            console.log('opening dialog form');
            setIsDialogFormOpen(true);
        }
        app.on(app.dialogFormRequested, onDialogFormRequested)
        return () => app.removeListener(app.dialogFormRequested, onDialogFormRequested)
    }, [])

    useEffect(() => {
        const onDialogFormCanceled = (item) => {
            console.log('closing dialog form');
            setIsDialogFormOpen(false);
        }
        app.on(app.dialogFormCanceled, onDialogFormCanceled)
        return () => app.removeListener(app.dialogFormCanceled, onDialogFormCanceled)
    }, [])

    return <Form
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
                {
                    explanations
                }
                {
                    explanations
                        ?
                        <div className="mb-12"></div>
                        :
                        null
                }
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
    </Form>
}

export { DialogForm };