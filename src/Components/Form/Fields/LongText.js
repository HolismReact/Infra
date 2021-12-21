import { useState, useEffect, useRef, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { fieldStyles, FormContext, app } from '@Form';

const LongText = ({ column, required, placeholder, hint, value }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        setId(`longText_${column}`);
    }, [column]);

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
        <TextField
            id={id}
            inputRef={htmlInput}
            error={isValid() ? false : true}
            label={placeholder}
            required={required ? true : false}
            helperText={helpText}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            multiline
            fullWidth
            rows={4}
        />
    </div>
}

export { LongText }