import React, { useContext, useState, useEffect } from 'react';
import { ListContext } from "../List";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import filterOperator from '../../../Base/FilterOperator';

const Filter = ({ column, placeholder, children, type, value }) => {

    const [id, setId] = useState();
    const [currentValue, setCurrentValue] = useState(value || "");
    var { listParameters } = useContext(ListContext);

    useEffect(() => {
        setId(`${type}_${column}`);
    }, [column]);

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
    };

    useEffect(() => {
        listParameters.addFilter(column, filterOperator.contains, currentValue);
    }, [currentValue]);

    return <div className="filter mt-4 mr-4">
        <FormControl
        >
            <InputLabel htmlFor={id}>{placeholder}</InputLabel>
            {
                children
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