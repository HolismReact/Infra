import Holism from "../../Base/Holism";
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const TextFilter = ({ column, placeholder }) => {

    const [value, setValue] = useState('');

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in TextFilter`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in TextFilter`);
    }

    return <TextField
        onChange={(event, value) => setValue(event.target.value)}
        lable={placeholder}
    />
};

export default TextFilter;