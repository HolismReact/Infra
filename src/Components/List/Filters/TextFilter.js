import Holism from "../../../Base/Holism";
import TextField from '@material-ui/core/TextField';
import { useContext } from 'react';
import { ListContext } from "../../List";
import filterOperator from "../../../Base/FilterOperator";

const TextFilter = ({ column, placeholder }) => {

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in TextFilter`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in TextFilter`);
    }

    const { listParameters } = useContext(ListContext);

    const handleChange = (event) => {
        const value = event.target.value;
        listParameters.addFilter(column, filterOperator.contains, value);
    }

    return <TextField
        onChange={handleChange}
        lable={placeholder}
    />
};

export default TextFilter;