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
    entityType,
    title,
    explanations,
    inputs,
    actions,
    large,
    okAction
}) => {

    const [isDialogFormOpen, setIsDialogFormOpen] = useState(false);

    useEffect(() => {
        const onEditRequested = (params) => {
            if (params.entityType === entityType) {
                setIsDialogFormOpen(true)
            }
        }
        app.on(app.editRequested, onEditRequested)
        return () => {
            app.removeListener(app.editRequested, onEditRequested)
        }
    }, [])

    useEffect(() => {
        const onCreationRequested = (item) => {
            setIsDialogFormOpen(true);
        }
        app.on(app.creationRequested, onCreationRequested)
        return () => app.removeListener(app.creationRequested, onCreationRequested)
    }, [])

    useEffect(() => {
        const onItemActionDialogRequested = (item) => {
            setIsDialogFormOpen(true);
        }
        app.on(app.itemActionDialogRequested, onItemActionDialogRequested)
        return () => app.removeListener(app.itemActionDialogRequested, onItemActionDialogRequested)
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

    useEffect(() => {
        const onEditRequested = ({ entityType, item }) => {

        }
    }, [])

    return <FormBase
        entityType={entityType}
        title={title}
        explanations={explanations}
        inputs={inputs}
        actions={actions}
        okAction={okAction}
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