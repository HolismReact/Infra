import TextField from '@material-ui/core/TextField';
import Holism from '../../Base/Holism';
import { useState, useEffect, useRef } from 'react';

let log = console.log;

const Text = ({ column, required, placeholder, hint, value }) => {
    
    const [id, setId] = useState(null);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const initialHint = hint;
    log(id, column, 'body');

    useEffect(() => {
        setId(Holism.randomId());
    }, []);

    useEffect(() => {
        const handler = () => {
            console.log(htmlInput.current.id, column, 'event');
            //console.log(htmlInput.current?.value);
            const input = htmlInput.current;
            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, input.value);
            input.dispatchEvent(new Event('change', { bubbles: true }));
            log('got form submission from text component');
        };
        Holism.on(Holism.formSubmissionEvent, handler);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handler);
        }
    }, []);

    const handleChange = (event) => {
        log(id, column, 'change');
        var newValue = event.target.value;
        if (required && Holism.isNothing(newValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    return <div className='field'>
        <TextField
            //id={id}
            inputRef={htmlInput}
            error={validationResult ? true : false}
            label={placeholder}
            required={required ? true : false}
            helperText={helpText}
            value={value}
            onChange={handleChange}
        />
    </div>
};

export default Text;