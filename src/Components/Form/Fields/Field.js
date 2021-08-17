import Holism from '../../../Base/Holism';
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
        validationStateProvider(currentValue);
    }, [currentValue]);

    useEffect(() => {
        Holism.addFieldToFormContext(formContext, id, undefined, false);
        Holism.on(Holism.formSubmissionEvent, validationStateProvider);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, validationStateProvider);
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
        Holism.setField(formContext, id, currentValue, isValid() ? true : false);
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