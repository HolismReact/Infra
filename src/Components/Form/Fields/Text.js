import TextField from '@material-ui/core/TextField';
import Holism from '../../../Base/Holism';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../../Form';
import { fieldStyles } from './Field';

let log = console.log;

const Text = ({ column, required, placeholder, hint, value }) => {
    
    const [id, setId] = useState(null);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    
    useEffect(() => {
        setId('text_' + Holism.randomId());
    }, []);

    useEffect(() => {
        Holism.addFieldToFormContext(id, formContext, false);
        const handle = () => {
            validate();
        };
        Holism.on(Holism.formSubmissionEvent, handle);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handle);
        }
    }, [id]);

    const validate = (event) => {
        var newValue = htmlInput.current.value;
        if (required && Holism.isNothing(newValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    return <div className={fieldStyles}>
        <TextField
            id={id}
            inputRef={htmlInput}
            error={validationResult ? true : false}
            label={placeholder}
            required={required ? true : false}
            helperText={helpText}
            value={value}
            onChange={validate}
            fullWidth
        />
    </div>
};

export default Text;