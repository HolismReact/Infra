import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { Field, app } from '@Form';

const Select = ({
    hasEmpty,
    options,
    display,
    choose,
    ...rest
}) => {

    return <Field
        type='select'
        {...rest}
        renderInput={({ currentValue, setCurrentValue, label }) => {
            return <MuiSelect
                value={currentValue}
                label={app.t(label)}
                onChange={(e) => setCurrentValue(e.target.value)}
            >
                {
                    hasEmpty
                        ?
                        <MenuItem value="">
                            <em>{app.t('Please choose')}</em>
                        </MenuItem>
                        :
                        null
                }
                {
                    options.map(option => <MenuItem key={option.id} value={choose(option)}>{display(option)}</MenuItem>)
                }
            </MuiSelect>
        }}
    />
};

export { Select }