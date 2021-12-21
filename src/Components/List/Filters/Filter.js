import React, { useContext, useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from '../../../Base/App';
import { ListContext } from "../List";
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

    app.ensure(column);

    const [id, setId] = useState();
    const [labelId, setLabelId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    var { listParameters } = useContext(ListContext);
    const label = placeholder || column;

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
            <InputLabel>{app.t(label)}</InputLabel>
            {
                renderInput(currentValue, setCurrentValue, label)
            }
        </FormControl>
    </div>
}

export default Filter;