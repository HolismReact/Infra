import 'date-fns';
import { KeyboardTimePicker, } from '@material-ui/pickers';
import Holism from '../../../Base/Holism';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

const Time = ({ column, required, placeholder, hint, value }) => {

    Holism.ensure([column, placeholder]);
    const [id, setId] = useState();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    const [currentValue, setCurrentValue] = React.useState(new Date(value) || new Date());

    useEffect(() => {
        setId(`time_${column}`);
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
        <KeyboardTimePicker
            error={isValid() ? false : true}
            id={id}
            label={placeholder}
            value={currentValue}
            onChange={(time) => { setCurrentValue(time) }}
            KeyboardButtonProps={{
                'aria-label': 'Change ' + placeholder,
            }}
            fullWidth
        />
    </div>
}

export { Time };