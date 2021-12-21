import OutlinedInput from '@mui/material/OutlinedInput';
import { app, Field } from '@Form';

const Text = ({
    column,
    placeholder,
    required,
    regex,
    regexError,
    hint,
    value
}) => {

    const validate = (currentValue) => {
        if (regex && regex.test && app.isSomething(currentValue)) {
            if (currentValue.match(regex)) {
                return true;
            }
            else {
                return {
                    error: 'regex',
                    message: regexError
                }
            }
        }
    }

    return <Field
        column={column}
        placeholder={placeholder}
        required={required}
        hint={hint}
        value={value}
        validate={validate}
        renderInput={({ currentValue, setCurrentValue, label }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
            />
        }}
    />
};

export { Text }