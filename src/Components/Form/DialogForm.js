import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormBase,
    Explanations,
    FormElement,
    Actions,
    app,
} from '@Form';

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

    useEffect(() => {
        const onItemCreated = (item) => {
            setIsDialogFormOpen(false);
        }
        app.on(app.itemCreated, onItemCreated)
        return () => app.removeListener(app.itemCreated, onItemCreated)
    }, [])

    return <FormBase
        entity={entity}
        renderForm={({
            title,
            focusFirstInput,
            handleSubmit,
        }) => {
            return <Dialog
                /*dir={app.isRtl() ? "rtl" : "ltr"}*/
                open={isDialogFormOpen}
                id='dialogForm'
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth={large ? 'md' : 'sm'}
                TransitionProps={{
                    onEntered: () => {
                        focusFirstInput('dialogForm')
                    }
                }}
            >
                <DialogTitle id="form-dialog-title">{app.t(title)}</DialogTitle>
                <DialogContent>
                    <Explanations explanations={explanations} />
                    <FormElement inputs={inputs} handleSubmit={handleSubmit} />
                </DialogContent>
                <DialogActions>
                    <Actions
                        actions={actions}
                        handleSubmit={handleSubmit}
                    />
                </DialogActions>
            </Dialog>
        }}
    />
}

export { DialogForm };