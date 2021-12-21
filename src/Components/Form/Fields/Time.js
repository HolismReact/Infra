import OutlinedInput from '@mui/material/OutlinedInput';
import TimePicker from '@mui/lab/TimePicker';
import { Field, app } from '@Form'

const Time = (props) => {

    return <Field
        {...props}
        renderInput={({ displayValue, setDisplayValue, label, progress }) => {
            return <TimePicker
                label={app.t(label)}
                value={displayValue}
                disabled={progress}
                onChange={(time) => { setDisplayValue(time) }}
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

export { Time };