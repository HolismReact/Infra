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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import app from '../../../Base/App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, required, placeholder, hint, value, browser, display, choose }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    app.ensure([column])

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
        if (required && app.isNothing(currentValue)) {
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
            item = item.item;
            setIsBrowserDialogOpen(false);

            var dispalyItem = display(item);
            if (typeof dispalyItem == "undefined")
                throw new Error(`No dispaly value specified for Browse ${column} `)
            setCurrentValue(dispalyItem);

            if (typeof choose == "function") {
                try {
                    let selected = choose(item);
                    if (typeof selected == "undefined" || typeof selected === "function")
                        throw new Error(`No return value specified for Browse ${column} `)
                    app.setField(formContext, id, selected, validationResult ? false : true);
                } catch (error) {
                    throw new Error(`No return value specified for Browse ${column} `)
                }
            }
            else if (column.endsWith('Guid')) {
                app.setField(formContext, id, item.guid, validationResult ? false : true);
            }
            else if (column.endsWith('Id')) {
                app.setField(formContext, id, item.id, validationResult ? false : true);
            }
            else {
                throw new Error(`No return value specified for Browse ${column} `)
            }
        }
        app.on(app.entitySelected, handleEntitySelection);
        return () => {
            app.removeListener(app.entitySelected, handleEntitySelection);
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
            error={validationResult ? true : false}
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