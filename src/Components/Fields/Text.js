import TextField from '@material-ui/core/TextField';
import Holism from '../../Base/Holism';
import { useState } from 'react';

const Text = ({ column, required, placeholder, hint, value }) => {

    const [helpText, setHelpText] = useState(hint);
    const [validationResult, setValidationResult] = useState(null);
    const initialHint = hint;

    const handleChange = (event) => {
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