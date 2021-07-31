import TextField from '@material-ui/core/TextField';
import Holism from '../../Base/Holism';
import { useState } from 'react';


const Text = ({ column, required, placeholder, hint, value }) => {
    
    const [id, setId] = useState(Math.random().toString().slice(2));
    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const initialHint = hint;
    console.log(id, column, 'body');

    Holism.on(Holism.formSubmissionEvent, () => {
        console.log(id, column, 'event');
        return;
        const input = document.querySelector(`#${id}`);
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, input.value);
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('got form submission from text component');
    });

    const handleChange = (event) => {
        console.log(id, column, 'change');
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
            id={id}
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