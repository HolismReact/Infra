import OutlinedInput from '@mui/material/OutlinedInput';
import { app, Field } from '@Form';

const Text = ({
    regex,
    regexError,
    ...rest
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
        type='text'
        {...rest}
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