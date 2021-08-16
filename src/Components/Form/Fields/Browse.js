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

const Browse = ({ column, required, placeholder, hint, value }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        setId(`text_${column}`);
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
        Holism.setField(formContext, id, currentValue, validationResult ? false : true);
    }, [validationResult]);

    return <div className={fieldStyles}>
        <FormControl
            error={validationResult ? true : false}
            fullWidth
        >
            <InputLabel htmlFor={id}>{placeholder}</InputLabel>
            <Input
                id={id}
                inputRef={htmlInput}
                required={required ? true : false}
                helperText={helpText}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => { }}
                            onMouseDown={() => { }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>{helpText}</FormHelperText>
        </FormControl>
    </div>
};

export { Browse };