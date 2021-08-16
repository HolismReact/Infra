import TextField from '@material-ui/core/TextField';
import Holism from '../../../Base/Holism';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';

const LongText = ({ column, required, placeholder, hint, value }) => {

    const [id, setId] = useState(null);
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
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
        const handle = () => {
            validate();
        };
        Holism.on(Holism.formSubmissionEvent, handle);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handle);
        }
    }, [id, formContext]);

    const validate = (event) => {
        if (required && Holism.isNothing(currentValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    useEffect(() => {
        Holism.setField(formContext, id, currentValue, validationResult ? false : true);
    }, [validationResult]);

    return <div className={fieldStyles}>
        <TextField
            id={id}
            inputRef={htmlInput}
            error={validationResult ? true : false}
            label={placeholder}
            required={required ? true : false}
            helperText={helpText}
            value={value}
            onChange={() => setCurrentValue(event.target.value)}
            multiline
            fullWidth
            rows={4}
        />
    </div>
}

export { LongText }