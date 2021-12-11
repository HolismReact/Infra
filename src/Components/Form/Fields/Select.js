import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import app from '../../../Base/App';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import { get } from '@List';

const Select = ({ column, required, placeholder, hint, value, entity, display, option }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        get(`/${entity}/list`)
            .then(data => {
                setLoading(false);
                setItems(data.data);
            }, error => {
                setLoading(false);
                app.error(error);
            })
    }, [])

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        setId(`autocomplete_${column}`);
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        app.on(app.formSubmissionEvent, validate);
        return () => {
            app.removeListener(app.formSubmissionEvent, validate);
        }
    }, [id, formContext]);

    const validate = () => {
        if (required && app.isNothing(currentValue)) {
            setValidationState('invalid required ' + Date.now());
            setHelpText(required);
        }
        else {
            setValidationState('valid ' + Date.now());
            setHelpText(initialHint);
        }
    }

    const isValid = () => {
        if (!validationState) {
            return false;
        }
        if (validationState.indexOf('invalid') > -1) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        app.setField(formContext, id, currentValue, isValid() ? true : false);
    }, [validationState]);

    return <div className={fieldStyles}>
        <Autocomplete
            id={id}
            inputRef={htmlInput}
            error={isValid() ? false : true}
            required={required ? true : false}
            helperText={helpText}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            fullWidth
            disablePortal
            options={items}
            autoHighlight
            getOptionLabel={(option) => {
                if (!display || typeof display !== 'function') {
                    return option.title || option.name || option.key;
                }
                return display(option);
            }}
            // renderOption={(props, option) => option(props, option)}
            renderInput={(params) => <TextField
                {...params}
                label={placeholder}
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
            />}
        />
    </div>
};

export { Select }