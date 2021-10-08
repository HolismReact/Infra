import app from '../../../Base/App';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

const Field = ({ column, placeholder, children, type, value, hint, validationStateProvider }) => {

    const [id, setId] = useState();
    const [helpTextId, setHelpTextId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    const [helpText, setHelpText] = useState(hint);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const [validationState, setValidationState] = useState(null);

    useEffect(() => {
        setId(`${type}_${column}`);
    }, [column]);

    useEffect(() => {
        setHelpTextId(`${id}_help`);
    }, [id]);

    useEffect(() => {
        var newState = validationStateProvider(currentValue) + Date.now();
        setValidationState(newState);
    }, [currentValue]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        app.on(app.formSubmissionEvent, validationStateProvider);
        return () => {
            app.removeListener(app.formSubmissionEvent, validationStateProvider);
        }
    }, [id, formContext]);

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
        >
            <InputLabel htmlFor={id}>{placeholder}</InputLabel>
            {
                React.cloneElement(children, {
                    // id: id,
                    value: currentValue,
                    // "aria-describedby": helpTextId,
                    handleChange: (e) => { console.log(e.target.value); setCurrentValue(e.target.value) }
                })
            }
            {/* {
                children(currentValue, setCurrentValue)
            } */}
            <FormHelperText id={helpTextId}>{helpText}</FormHelperText>
        </FormControl>
    </div>
};

export { Field };