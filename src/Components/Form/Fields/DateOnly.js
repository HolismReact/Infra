import 'date-fns';
import { KeyboardDatePicker, } from '@material-ui/pickers';
import Holism from '../../../Base/Holism';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

const DateOnly = ({ column, required, placeholder, hint, value }) => {

    Holism.ensure([column, placeholder]);
    const [id, setId] = useState();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    const [currentValue, setCurrentValue] = useState(value ? new Date(value) : new Date());

    useEffect(() => {
        setId(`date_${column}`);
    }, [column]);

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        Holism.addFieldToFormContext(formContext, id, undefined, false);
        Holism.on(Holism.formSubmissionEvent, validate);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, validate);
        }
    }, [id, formContext]);

    const validate = () => {
        if (required && Holism.isNothing(currentValue)) {
            setValidationState('invalid required ' + Date.now());
            setHelpText(required);
        }
        else {
            setValidationState('valid ' + Date.now());
            setHelpText(initialHint);
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
        Holism.setField(formContext, id, currentValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>
        <KeyboardDatePicker
            error={isValid() ? false : true}
            id={id}
            label={placeholder}
            format="MM/dd/yyyy"
            value={currentValue}
            onChange={(date) => { setCurrentValue(date) }}
            KeyboardButtonProps={{
                'aria-label': 'Change ' + placeholder,
            }}
            fullWidth
        />
    </div>
}

export { DateOnly };