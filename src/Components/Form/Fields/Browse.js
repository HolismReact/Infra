import React, { useState, useEffect, useContext, useRef } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { Field, app } from '@Form';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({
    browser,
    display,
    choose,
    ...rest
}) => {

    const [id, setId] = useState();
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    app.ensure([display, browser])

    // useEffect(() => {
    //     validate();
    // }, [selectedEntity]);

    // useEffect(() => {
    //     app.addFieldToFormContext(formContext, id, undefined, false);
    //     const handle = () => {
    //         validate();
    //     };
    //     app.on(app.formSubmitted, handle);
    //     return () => {
    //         app.removeListener(app.formSubmitted, handle);
    //     }
    // }, [id, formContext]);

    // useEffect(() => {
    //     const handleEntitySelection = ({ item, callerId }) => {
    //         if (callerId != id) {
    //             return;
    //         }
    //         setSelectedEntity(item.item);
    //         setIsBrowserDialogOpen(false);
    //     }
    //     app.on(app.entitySelected, handleEntitySelection);
    //     return () => {
    //         app.removeListener(app.entitySelected, handleEntitySelection);
    //     }
    // });

    // useEffect(() => {
    //     if (!selectedEntity) {
    //         return;
    //     }
    //     if (typeof display(selectedEntity) == "undefined")
    //         throw new Error(`No dispaly value specified for Browse ${column} `)
    //     setCurrentValue(display(selectedEntity));
    // }, [selectedEntity]);

    // useEffect(() => {
    //     if (!selectedEntity) {
    //         app.setField(formContext, id, selectedEntity, false);
    //     }
    //     else if (typeof choose == "function") {
    //         try {
    //             let chosenValue = choose(selectedEntity);
    //             if (typeof chosenValue == "undefined" || typeof chosenValue === "function")
    //                 throw new Error(`No return value specified for ${column} browser chooser function`)
    //             app.setField(formContext, id, chosenValue, isValid());
    //         } catch (error) {
    //             throw new Error(`No return value specified for ${column} browser chooser function`);
    //         }
    //     }
    //     else if (column.endsWith('Guid')) {
    //         app.setField(formContext, id, selectedEntity.guid, isValid());
    //     }
    //     else if (column.endsWith('Id')) {
    //         app.setField(formContext, id, selectedEntity.id, isValid());
    //     }
    //     else {
    //         throw new Error(`No return value specified for ${column} browser chooser function`);
    //     }
    // }, [validationState]);

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        aria-labelledby="browserDialog"
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            id="browserDialog"
            className="bg-gray-100"
        >
            <div className="flex items-center">
                <IconButton onClick={() => setIsBrowserDialogOpen(false)} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <span className="ml-4">{app.t("Find")}</span>
            </div>
        </DialogTitle>
        <DialogContent>
            {
                React.cloneElement(browser(), {
                    callerId: id
                })
            }
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                {
                    <div className="mr-6 mb-6" >
                        <Button variant="outlined" onClick={() => setIsBrowserDialogOpen(false)}>
                            {app.t('Cancel')}
                        </Button>
                    </div>
                }
            </div>
        </DialogActions>
    </Dialog>

    return <Field
        type='browse'
        {...rest}
        renderInput={({ currentValue, setCurrentValue, label, progress }) => {
            return <>
                {
                    browserDialog
                }
                <OutlinedInput
                    label={app.t(label)}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    readOnly={true}
                    endAdornment={
                        <InputAdornment
                            disablePointerEvents={progress}
                            disableTypography={progress}
                            position="end"
                        >
                            <Tooltip
                                title={app.t("Find")}
                                disableFocusListener={progress}
                                disableFocusListener={progress}
                                disableInteractive={progress}
                                disableTouchListener={progress}
                            >
                                <IconButton
                                    disabled={progress}
                                    aria-label={app.t("Find")}
                                    onClick={() => setIsBrowserDialogOpen(true)}
                                    onMouseDown={() => { }}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                />
            </>
        }}
    />
};

export { Browse };