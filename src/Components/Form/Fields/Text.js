import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { app, Field } from '@Form'
import HolismIcon from '../../HolismIcon'

const Text = ({
    regex,
    regexError,
    startIcon,
    ...rest
}) => {

    const validate = ({ displayValue }) => {
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
        renderInput={({ displayValue, setDisplayValue, setChosenValue, label }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={displayValue}
                startAdornment={startIcon && <InputAdornment position="start">
                    <HolismIcon icon={startIcon} />
                </InputAdornment>}
                onChange={(e) => {
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
            />
        }}
    />
};

export { Text }