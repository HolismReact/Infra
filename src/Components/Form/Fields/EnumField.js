import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useLocalStorageState from '../../../Base/UseLocalStorageState';
import Holism from '../../../Base/Holism';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { get } from '../../../Base/Api';
import { FormContext } from '../../Form';

const EnumField = ({ column, entity, placeholder, hint, value, required }) => {

    if (Holism.isNothing(entity)) {
        throw new Error(`entity is not provided for ${EnumField.name}`);
    }

    const [id, setId] = useState(null);
    const htmlSelect = useRef();
    const [loading, setLoading] = useState();
    const [enumItems, setEnumItems] = useLocalStorageState([], entity + 'Enum');
    const initialHint = hint;
    const [validationResult, setValidationResult] = useState(null);
    var formContext = useContext(FormContext);

    useEffect(() => {
        setId('enum_' + Holism.randomId());
    }, []);

    useEffect(() => {
        Holism.addFieldToFormContext(id, formContext, false)
        var handler = () => {
            validate();
        };
        Holism.on(Holism.formSubmissionEvent, handler);
        return () => {
            Holism.removeListener(Holism.formSubmissionEvent, handler);
        }
    }, [id])

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
        ref={htmlSelect}
        error={validationResult ? true : false}
        required={required ? true : false}
        placeholder={placeholder}
        defaultValue={value || ""}
    >
        {enumItems.map(item => <MenuItem key={item.id} value={item.id}>{item.key}</MenuItem>)}
    </Select>
};

export default EnumField;