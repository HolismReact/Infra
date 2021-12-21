import React from 'react';
import DatePicker from '@mui/lab/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import 'date-fns';
import { Field, app, FormContext, fieldStyles } from '@Form';

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