import 'date-fns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import app from '../../../Base/App';

const DateOnly = ({ column, required, placeholder, hint, value }) => {

    app.ensure([column, placeholder]);
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
        app.addFieldToFormContext(formContext, id, undefined, false);
        app.on(app.formSubmissionEvent, validate);
        return () => {
            app.removeListener(app.formSubmissionEvent, validate);
        }
    }, [id, formContext]);

    const validate = () => {
        if (required && app.isNothing(currentValue)) {
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
        app.setField(formContext, id, currentValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>

        <DatePicker
            id={id}
            error={isValid() ? false : true}
            label={app.t(placeholder)}
            value={currentValue}
            onChange={(date) => { setCurrentValue(date) }}
            renderInput={(params) => <TextField {...params} fullWidth />}
        />
        {/* <DatePicker
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
                'aria-label': app.t('Change') + ' ' + app.t(placeholder),
            }}
        /> */}
    </div>
}

export { DateOnly };