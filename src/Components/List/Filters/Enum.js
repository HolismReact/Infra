import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import Holism from '../../../Base/Holism';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { get } from '../../../Base/Api';
import { ListContext } from '../List';

const Enum = ({ column, entity, placeholder }) => {

    Holism.ensure([column, placeholder, entity]);

    const [id, setId] = useState(null);
    const [labelId, setLabelId] = useState(null);
    const htmlSelect = useRef();
    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entity + 'Enum');
    const listContext = useContext(ListContext);

    useEffect(() => {
        setId(`enum_${column}`);
    }, [column]);

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

    return <div>
        {
            loading
                ?
                <div>loadin...</div>
                :
                <FormControl
                    fullWidth
                >
                    <InputLabel id={labelId}>{placeholder}</InputLabel>
                    <Select
                        ref={htmlSelect}
                        placeholder={placeholder}
                        fullWidth
                        //onChange={(event) => { setCurrentValue(event.target.value); validate(); }}
                    >
                        {enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.key}</MenuItem>)}
                    </Select>
                </FormControl>
        }
    </div>
};

export { Enum }