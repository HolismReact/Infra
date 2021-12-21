import React, { useState, useEffect, useRef, useContext } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import 'date-fns';
import { FormContext, fieldStyles, app } from '@Form';

const DateTime = ({ column, required, placeholder, hint, value }) => {

    app.ensure([column, placeholder]);
    const [id, setId] = useState();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    const [currentValue, setCurrentValue] = useState(value ? new Date(value) : new Date());

    useEffect(() => {
        setId(`dateTime_${column}`);
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
            error={isValid() ? false : true}
            id={id}
            label={app.t(placeholder)}
            format="MM/dd/yyyy HH:mm"
            value={currentValue}
            onChange={(date) => { setCurrentValue(date) }}
            KeyboardButtonProps={{
                'aria-label': app.t('Change') + ' ' + app.t(placeholder),
            }}
            fullWidth
        />
    </div>
}

export { DateTime };