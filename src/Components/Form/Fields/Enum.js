import useLocalStorageState from '../../../Base/UseLocalStorageState';
import app from '../../../Base/App';
import React, { useEffect, useState } from 'react';
import { get } from '../../../Base/Api';
import { fieldStyles } from './FieldStyle';
import CircularProgress from '@mui/material/CircularProgress';
import { Select } from './Select';

const Enum = ({ column, entity, placeholder, hint, value, required }) => {

    if (app.isNothing(entity)) {
        throw new Error(`entity is not provided for ${Enum.name}`);
    }

    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entity + 'Enum');

    useEffect(() => {
        if (enumItems.length !== 0) {
            return;
        }
        setLoading(true);
        get(`/${entity}/all`).then(data => {
            setEnumItems(data);
            setLoading(false);
        }, error => {
            console.log(error);
            setLoading(false);
        })
    }, []);

    return <div className={fieldStyles}>
        {
            loading
                ?
                <CircularProgress />
                :
                <Select
                    column={column}
                    placeholder={placeholder}
                    hint={hint}
                    options={enumItems}
                    display={item => item.key}
                    choose={item => item.id}
                />
        }
    </div>
};

export { Enum };
