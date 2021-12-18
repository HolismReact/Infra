import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import app from '../../../Base/App';
import React, { useEffect, useState, useRef } from 'react';
import { get } from '../../../Base/Api';
import Filter from './Filter';
import filterOperator from '../../../Base/FilterOperator';
import CircularProgress from '@mui/material/CircularProgress';

const Enum = ({ column, entity, placeholder }) => {

    app.ensure([column, placeholder, entity]);

    const htmlSelect = useRef();
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

    return <Filter
        type='select'
        column={column}
        placeholder={placeholder}
        operator={filterOperator.equals}
        renderInput={(value, setValue) =>
            <Select
                value={value}
                ref={htmlSelect}
                placeholder={app.t(placeholder)}
                fullWidth
                onChange={(event) => { setValue(event.target.value) }}
            >
                {
                    loading
                        ?
                        <CircularProgress />
                        :
                        (
                            enumItems
                                ?
                                enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.titleizedKey}</MenuItem>)
                                :
                                null
                        )
                }
            </Select>}
    />
};

export { Enum }