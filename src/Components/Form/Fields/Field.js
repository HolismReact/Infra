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
    validationStateProvider,
    validate,
    renderInput,
}) => {

    const [id, setId] = useState();
    const [labelId, setLabelId] = useState();
    const htmlInput = useRef();
    const [currentValue, setCurrentValue] = useState(value || "");
    const [helpText, setHelpText] = useState(hint);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const [validationState, setValidationState] = useState(null);
    const label = placeholder || column;

    useEffect(() => {
        setId(`${type}_${column}`);
    }, [column]);

    useEffect(() => {
        setLabelId(`${id}_lable`);
    }, [id]);

    useEffect(() => {
        validateAll();
    }, [currentValue]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        app.on(app.formSubmitted, isValid);
        return () => {
            app.removeListener(app.formSubmitted, isValid);
        }
    }, [id, formContext]);

    const validateAll = () => {
        if (required && app.isNothing(currentValue)) {
            setValidationState('invalid required ' + Date.now());
            setHelpText(required);
        }
        else {
            setValidationState('valid ' + Date.now());
            setHelpText(initialHint);

            if (validate && typeof validate === 'function') {
                var result = validate(currentValue, setValidationState, setHelpText);
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
        app.setField(formContext, id, currentValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>
        <FormControl
            error={isValid() ? false : true}
            fullWidth
            required={required ? true : false}
            disabled={formContext.progress}
        >
            <InputLabel htmlFor={id}>{app.t(label)}</InputLabel>
            {
                renderInput({
                    currentValue,
                    setCurrentValue,
                    label,
                    id
                })
            }
            <FormHelperText>{app.t(helpText)}</FormHelperText>
        </FormControl>
    </div>
};

export { Field };