import React, { useState, useEffect, useRef, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { app, FormContext, fieldStyles } from '@Form';

const Field = ({
    column,
    placeholder,
    required,
    value,
    hint,
    type,
    validate,
    renderInput,
}) => {

    const [id, setId] = useState();
    const [labelId, setLabelId] = useState();
    const htmlInput = useRef();
    const [displayValue, setDisplayValue] = useState(value || "");
    const [chosenValue, setChosenValue] = useState(value || "");
    const [chosenEntity, setChosenEntity] = useState(null);
    const [helpText, setHelpText] = useState(hint);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const { progress } = formContext;
    const [validationState, setValidationState] = useState(null);
    const label = placeholder || column;

    const setField = (value, isValid) => {
        app.setField(formContext, id, value, isValid);
    }

    useEffect(() => {
        setId(`${type}_${column}`);
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        setLabelId(`${id}_lable`);
    }, [id]);

    useEffect(() => {
        validateAll();
    }, [displayValue]);

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now());
            setHelpText(required);
        }
        else {
            setValidationState('valid ' + Date.now());
            setHelpText(initialHint);

            if (validate && typeof validate === 'function') {
                var result = validate({ displayValue, chosenValue, chosenEntity });
                if (!result || result === true) {
                    setValidationState('valid ' + Date.now());
                    setHelpText(initialHint);
                }
                else {
                    setValidationState(`invalid ${result?.error} ${Date.now()}`)
                    setHelpText(result?.message);
                }
            }
        }
    }

    const isValid = () => {
        if (!validationState) {
            return false;
        }
        if (validationState.indexOf('invalid') > -1) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        setField(chosenValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>
        <FormControl
            error={isValid() ? false : true}
            fullWidth
            required={required ? true : false}
            disabled={progress}
        >
            <InputLabel htmlFor={id}>{app.t(label)}</InputLabel>
            {
                renderInput({
                    displayValue,
                    setDisplayValue,
                    setChosenValue,
                    label,
                    id,
                    setField,
                    progress
                })
            }
            <FormHelperText>{app.t(helpText)}</FormHelperText>
        </FormControl>
    </div>
};

export { Field };