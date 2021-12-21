import DatePicker from '@mui/lab/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Field, app } from '@Form';

const DateOnly = (props) => {

    return <Field
        type='date'
        {...props}
        renderInput={({ displayValue, setDisplayValue, label, progress }) => {
            return <DatePicker
                value={displayValue}
                disabled={progress}
                onChange={(date) => { setDisplayValue(date) }}
                renderInput={({
                    inputRef,
                    inputProps,
                    InputProps
                }) => <OutlinedInput
                        label={app.t(label)}
                        endAdornment={InputProps?.endAdornment}
                        ref={inputRef}
                        inputProps={inputProps}
                    />}
            />
        }}
    />
}

export { DateOnly };