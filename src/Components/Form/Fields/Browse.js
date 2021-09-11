import React, { useState, useEffect, useContext, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { fieldStyles } from './FieldStyle';
import { FormContext } from '../Form';
import Holism from '../../../Base/Holism';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, required, placeholder, hint, value, browser, valueDisplayer }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    const clonedBrowser = React.cloneElement(browser(), {
        callerId: id
    });

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        setId(`browse_${column}`);
    }, [column]);

    useEffect(() => {
        Holism.addFieldToFormContext(formContext, id, undefined, false);
        const handle = () => {
            validate();
        };
        Holism.on(Holism.formSubmissionEvent, handle);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handle);
        }
    }, [id, formContext]);

    const validate = () => {
        if (required && Holism.isNothing(currentValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    useEffect(() => {
        const handleEntitySelection = ({ item, callerId }) => {
            if (callerId != id) {
                return;
            }
            setIsBrowserDialogOpen(false);
            setCurrentValue(valueDisplayer(item));
            if (column.endsWith('Guid')) {
                Holism.setField(formContext, id, item.guid, validationResult ? false : true);
            }
            else if (column.endsWith('Id')) {
                Holism.setField(formContext, id, item.id, validationResult ? false : true);
            }
        }
        Holism.on(Holism.entitySelected, handleEntitySelection);
        return () => {
            Holism.removeListener(Holism.entitySelected, handleEntitySelection);
        }
    });

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
                <span className="ml-4">{"Find"}</span>
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
                            Cancel
                        </Button>
                    </div>
                }
            </div>
        </DialogActions>
    </Dialog>

    return <div className={fieldStyles}>
        {browserDialog}
        <FormControl
            error={validationResult ? true : false}
            fullWidth
        >
            <InputLabel htmlFor={id}>{placeholder}</InputLabel>
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
                        <Tooltip title={"Find"}>
                            <IconButton
                                aria-label={"Find"}
                                onClick={() => setIsBrowserDialogOpen(true)}
                                onMouseDown={() => { }}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
            />
            <FormHelperText>{helpText}</FormHelperText>
        </FormControl>
    </div>
};

export { Browse };