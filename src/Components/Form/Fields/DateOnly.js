import DatePicker from '@mui/lab/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Field, app } from '@Form';

const DateOnly = (props) => {

    return <Field
        type='date'
        {...props}
        renderInput={({ currentValue, setCurrentValue, label, progress }) => {
            return <DatePicker
                value={currentValue}
                disabled={progress}
                onChange={(date) => { setCurrentValue(date) }}
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