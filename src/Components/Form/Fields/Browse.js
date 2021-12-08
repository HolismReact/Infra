import React, { useState, useEffect, useContext, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { fieldStyles } from './FieldStyle';
import { FormContext } from '../Form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import app from '../../../Base/App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, required, placeholder, hint, value, browser, display, choose }) => {

    const [id, setId] = useState();
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [currentValue, setCurrentValue] = useState(value || "");
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    app.ensure([column, placeholder, display])

    const clonedBrowser = React.cloneElement(browser(), {
        callerId: id
    });

    useEffect(() => {
        validate();
    }, [selectedEntity]);

    useEffect(() => {
        setId(`browse_${column}`);
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        const handle = () => {
            validate();
        };
        app.on(app.formSubmissionEvent, handle);
        return () => {
            app.removeListener(app.formSubmissionEvent, handle);
        }
    }, [id, formContext]);

    const validate = () => {
        if (required && app.isNothing(selectedEntity)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult('valid');
            setHelpText(initialHint);
        }
    }

    useEffect(() => {
        const handleEntitySelection = ({ item, callerId }) => {
            if (callerId != id) {
                return;
            }
            setSelectedEntity(item.item);
            setIsBrowserDialogOpen(false);
        }
        app.on(app.entitySelected, handleEntitySelection);
        return () => {
            app.removeListener(app.entitySelected, handleEntitySelection);
        }
    });

    useEffect(() => {
        if (!selectedEntity) {
            return;
        }
        if (typeof display(selectedEntity) == "undefined")
            throw new Error(`No dispaly value specified for Browse ${column} `)
        setCurrentValue(display(selectedEntity));
    }, [selectedEntity]);

    useEffect(() => {
        if (!selectedEntity) {
            app.setField(formContext, id, selectedEntity, false);
        }
        else if (typeof choose == "function") {
            try {
                let chosenValue = choose(selectedEntity);
                if (typeof chosenValue == "undefined" || typeof chosenValue === "function")
                    throw new Error(`No return value specified for ${column} browser chooser function`)
                app.setField(formContext, id, chosenValue, validationResult === 'valid' ? true : false);
            } catch (error) {
                throw new Error(`No return value specified for ${column} browser chooser function`);
            }
        }
        else if (column.endsWith('Guid')) {
            app.setField(formContext, id, selectedEntity.guid, validationResult === 'valid' ? true : false);
        }
        else if (column.endsWith('Id')) {
            app.setField(formContext, id, selectedEntity.id, validationResult === 'valid' ? true : false);
        }
        else {
            throw new Error(`No return value specified for ${column} browser chooser function`);
        }
    }, [validationResult]);

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        aria-labelledby="form-dialog-title"
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            id="form-dialog-title"
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
            {clonedBrowser}
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

    return <div className={fieldStyles}>
        {browserDialog}
        <FormControl
            error={validationResult !== 'valid' ? true : false}
            fullWidth
        >
            <InputLabel htmlFor={id}>{app.t(placeholder)}</InputLabel>
            <Input
                id={id}
                inputRef={htmlInput}
                required={required ? true : false}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                // startAdornment={
                //     <InputAdornment position="start">
                //     </InputAdornment>
                // }
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip title={app.t("Find")}>
                            <IconButton
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
            <FormHelperText>{app.t(helpText)}</FormHelperText>
        </FormControl>
    </div>
};

export { Browse };