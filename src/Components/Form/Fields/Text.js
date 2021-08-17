import TextField from '@material-ui/core/TextField';
import Holism from '../../../Base/Holism';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

const Text = ({ column, required, placeholder, hint, value }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);

    useEffect(() => {
        isValid();
    }, [currentValue]);

    useEffect(() => {
        setId(`text_${column}`);
    }, [column]);

    useEffect(() => {
        Holism.addFieldToFormContext(formContext, id, undefined, false);
        const handle = () => {
            isValid();
        };
        Holism.on(Holism.formSubmissionEvent, handle);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handle);
        }
    }, [id, formContext]);

    const isValid = () => {
        if (required && Holism.isNothing(currentValue)) {
            setValidationState('invalid required');
            setHelpText(required);
            return false;
        }
        setValidationState(null);
        setHelpText(initialHint);
        return true;
    }

    useEffect(() => {
        Holism.setField(formContext, id, currentValue, isValid() ? true : false);
    }, [currentValue]);

    return <div className={fieldStyles}>
        <TextField
            id={id}
            inputRef={htmlInput}
            error={validationState ? true : false}
            label={placeholder}
            required={required ? true : false}
            helperText={helpText}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            fullWidth
        />
    </div>
};

export { Text }