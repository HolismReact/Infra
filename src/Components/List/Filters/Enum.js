import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import app from '../../../Base/App';
import React, { useEffect, useState, useRef } from 'react';
import { get } from '../../../Base/Api';
import Filter from './Filter';
import filterOperator from '../../../Base/FilterOperator';

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
        renderInput={(value, setValue) => {
            return loading
                ?
                <div>loading...</div>
                :
                <Select
                    value={value}
                    ref={htmlSelect}
                    placeholder={app.t(placeholder)}
                    fullWidth
                    onChange={(event) => { setValue(event.target.value) }}
                >
                    {
                        enumItems
                            ?
                            enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.key}</MenuItem>)
                            :
                            null
                    }
                </Select>
        }}
    />
};

export { Enum }