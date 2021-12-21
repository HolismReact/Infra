import { useState, useEffect, useRef, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';
import { get, app, FormContext, fieldStyles } from '@Form';

const Select = ({
    column,
    required,
    placeholder,
    hint,
    value,
    entity,
    hasEmpty,
    options,
    display,
    choose }) => {

    const [id, setId] = useState();
    const [labelId, setLabelId] = useState();
    const [currentValue, setCurrentValue] = useState(value);
    const htmlInput = useRef();
    const [helpText, setHelpText] = useState(hint);
    const [validationState, setValidationState] = useState(null);
    const initialHint = hint;
    var formContext = useContext(FormContext);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (entity) {
            setLoading(true);
            get(`/${entity}/list`)
                .then(data => {
                    setLoading(false);
                    setItems(data.data);
                }, error => {
                    setLoading(false);
                    app.error(error);
                })
        }
    }, [])

    useEffect(() => {
        validate();
    }, [currentValue]);

    useEffect(() => {
        setId(`select_${column}`);
        setLabelId(`select_${column}_label`)
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, undefined, false);
        app.on(app.formSubmitted, validate);
        return () => {
            app.removeListener(app.formSubmitted, validate);
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
        <FormControl
            error={isValid() ? false : true}
            required={required ? true : false}
            fullWidth
        >
            <InputLabel id={labelId}>{app.t(placeholder)}</InputLabel>
            <MuiSelect
                ref={htmlInput}
                labelId={labelId}
                id={id}
                value={currentValue}
                required={required ? true : false}
                label={app.t(placeholder) + (required ? ' *' : '')}
                onChange={(e) => setCurrentValue(e.target.value)}
            >
                {
                    hasEmpty
                        ?
                        <MenuItem value="">
                            <em>{app.t('Please choose')}</em>
                        </MenuItem>
                        :
                        null
                }
                {
                    options.map(option => <MenuItem key={option.id} value={choose(option)}>{display(option)}</MenuItem>)
                }
            </MuiSelect>
            <FormHelperText>{helpText}</FormHelperText>
        </FormControl>
    </div>
};

export { Select }