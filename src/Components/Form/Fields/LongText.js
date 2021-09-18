import TextField from '@material-ui/core/TextField';
import Holism from '../../../Base/Holism';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

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