import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from "../List";
import app from '../../../Base/App';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import filterOperator from '../../../Base/FilterOperator';

const Filter = ({
    column,
    placeholder,
    children,
    type,
    value,
    renderInput,
    operator
}) => {

    app.ensure(column, placeholder);

    const [id, setId] = useState();
    const [labelId, setLabelId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    var { listParameters } = useContext(ListContext);

    useEffect(() => {
        const reset = () => {
            setCurrentValue(value || "");
        };
        app.on(app.resetFilters, reset);
        return () => {
            app.removeListener(app.resetFilters, reset);
        }
    }, []);

    useEffect(() => {
        setId(`${type}_${column}`)
    }, [column]);

    useEffect(() => {
        setLabelId(`${id}_label`)
    }, [id]);

    useEffect(() => {
        listParameters.addFilter(column, operator || filterOperator.contains, currentValue);
    }, [currentValue]);

    return <div className="filter mt-4 mr-4 w-64">
        <FormControl
            fullWidth
        >
            <InputLabel htmlFor={id}>{app.t(placeholder)}</InputLabel>
            {
                renderInput(currentValue, setCurrentValue, id)
            }
            {
                // children
                // React.cloneElement(children, {
                //     // id: id,
                //     //value: currentValue,
                //     // "aria-describedby": helpTextId,
                //     //handleChange: handleChange
                // })
            }
            {/* {
                children(currentValue, setCurrentValue)
            } */}
            {/* <FormHelperText id={helpTextId}>{helpText}</FormHelperText> */}
        </FormControl>
    </div>
}

export default Filter;