import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from '../../../Base/App';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { get } from '../../../Base/Api';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import CircularProgress from '@mui/material/CircularProgress';

const Lookup = ({ column, entity, placeholder, hint, value, required, display }) => {

    if (app.isNothing(entity)) {
        throw new Error(`entity is not provided for ${Lookup.name}`);
    }

    const [id, setId] = useState(null);
    const [currentValue, setCurrentValue] = useState(value);
    const [labelId, setLabelId] = useState(null);
    const htmlSelect = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [loading, setLoading] = useState();
    const [lookupItems, setLookupItems] = useState([]);
    const initialHint = hint;
    const [validationResult, setValidationResult] = useState(null);
    var formContext = useContext(FormContext);

    useEffect(() => {
        setId(`lookup_${column}`);
    }, [column]);

    useEffect(() => {
        setLabelId(`${id}_label`);
        app.addFieldToFormContext(formContext, id, undefined, false);
        var handler = () => {
            validate();
        };
        app.on(app.formSubmissionEvent, handler);
        return () => {
            app.removeListener(app.formSubmissionEvent, handler);
        }
    }, [id, formContext])

    useEffect(() => {
        if (lookupItems.length !== 0) {
            return;
        }
        setLoading(true);
        get(`/${entity}/all`).then(data => {
            setLookupItems(data);
            setLoading(false);
        }, error => {
            app.error(error);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        validate();
    }, [currentValue]);

    const validate = (event) => {
        console.log(currentValue);
        if (required && app.isNothing(currentValue)) {
            setValidationResult('invalid required');
            setHelpText(required);
        }
        else {
            setValidationResult(null);
            setHelpText(initialHint);
        }
    }

    useEffect(() => {
        app.setField(formContext, id, currentValue, validationResult ? false : true);
    }, [validationResult]);

    return <div className={fieldStyles}>
        {
            loading
                ?
                <CircularProgress />
                :
                <FormControl
                    fullWidth
                    error={validationResult ? true : false}
                >
                    <InputLabel id={labelId}>{placeholder}</InputLabel>
                    <Select
                        ref={htmlSelect}
                        error={validationResult ? true : false}
                        required={validationResult ? true : false}
                        placeholder={placeholder}
                        defaultValue={value || ""}
                        fullWidth
                        onChange={(event) => { setCurrentValue(event.target.value); }}
                        value={value}
                    >
                        {lookupItems.map(item => <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {
                                display(item)
                            }
                        </MenuItem>)}
                    </Select>
                    <FormHelperText>{helpText}</FormHelperText>
                </FormControl>
        }
    </div>
};

export { Lookup };
