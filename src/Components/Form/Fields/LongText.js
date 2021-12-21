import OutlinedInput from '@mui/material/OutlinedInput';
import { app, Field } from '@Form';

const LongText = (props) => {

    return <Field
        type="longText"
        {...props}
        renderInput={({ currentValue, setCurrentValue, label }) => {
            return <OutlinedInput
                label={app.t(label)}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                multiline
                rows={4}
            />
        }}
    />
}

export { LongText }