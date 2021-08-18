import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

const PositiveInteger = () => {
    const [value, setValue] = useState('hi');

    const handleChange = (e) => {
        var newValue = e.target.value;
        if (isNaN(newValue * 1)) {
            e.preventDefault();
            setValue(value);
            return;
        }
        if (newValue * 1 <= 0) {
            e.preventDefault();
            setValue(value);
            return;
        }
        setValue(value);
    }

    return <TextField
        value={value}
        onChange={handleChange}
    />
}

export default PositiveInteger;