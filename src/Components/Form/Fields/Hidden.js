import TextField from '@material-ui/core/TextField';
import app from '../../../Base/App';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

const Hidden = ({ column, required, placeholder, hint, value }) => {

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
        setId(`text_${column}`);
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
            type="hidden"
            inputRef={htmlInput}
            error={isValid() ? false : true}
            required={required ? true : false}
            value={currentValue}
        />
    </div>
};

export { Hidden }