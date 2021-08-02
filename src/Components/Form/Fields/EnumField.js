import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import Holism from '../../../Base/Holism';
import React, { useEffect, useState } from 'react';
import { get } from '../../../Base/Api';

const EnumField = ({ column, entity, placeholder, hint, value, required }) => {

    if (Holism.isNothing(entity)) {
        throw new Error(`entity is not provided for ${EnumField.name}`);
    }

    Holism.on(Holism.formSubmissionEvent, () => {
        console.log('got form submission from enum field');
    });

    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entity + 'Enum');
    const initialHint = hint;
    const [validationResult, setValidationResult] = useState(null);

    useEffect(() => {
        if (enumItems.length !== 0) {
            return;
        }
        setLoading(true);
        get(`/${entity}/all`).then(data => {
            console.log(data);
            setEnumItems(data);
            setLoading(false);
        }, error => {
            console.log(error);
            setLoading(false);
        })
    }, []);

    return <Select
        error={validationResult ? true : false}
        required={required ? true : false}
        placeholder={placeholder}
        defaultValue={value || ""}
    >
        {enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.key}</MenuItem>)}
    </Select>
};

export default EnumField;