import Select from '@material-ui/core/Select';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import Holism from '../../Base/Holism';
import React, { useEffect, useState } from 'react';
import { get } from '../../Base/Api';

const EnumField = ({ column, entity, placeholder, required }) => {

    if (Holism.isNothing(entity)) {
        throw new Error(`entity is not provided for ${EnumField.name}`);
    }

    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entity);

    if (enumItems.length === 0) {
        useEffect(() => {
            setLoading(true);
            get(`/${entity}/all`).then(data => {
                setEnumItems(data);
                setLoading(false);
            }, error => {
                console.log(error);
                setLoading(false);
            })
        }, []);
    }

    return <Select
        required={required ? true : false}
        placeholder={placeholder}
    >

    </Select>
};

export default EnumField;