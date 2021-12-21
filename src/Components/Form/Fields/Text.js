import OutlinedInput from '@mui/material/OutlinedInput';
import { app, Field } from '@Form';

const Text = ({
    regex,
    regexError,
    ...rest
}) => {

    const validate = (displayValue) => {
        if (regex && regex.test && app.isSomething(displayValue)) {
            if (displayValue.match(regex)) {
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
        type='text'
        {...rest}
        validate={validate}
        renderInput={({ displayValue, setDisplayValue, label }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={displayValue}
                onChange={(e) => setDisplayValue(e.target.value)}
            />
        }}
    />
};

export { Text }