import Holism from "../../../Base/Holism";
import TextField from '@material-ui/core/TextField';
import { useContext } from 'react';
import { ListContext } from "../List";
import filterOperator from "../../../Base/FilterOperator";
import Filter from "./Filter";

const Text = ({ column, placeholder }) => {

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in Text`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in Text`);
    }

    const { listParameters } = useContext(ListContext);

    const handleChange = (event) => {
        const value = event.target.value;
        listParameters.addFilter(column, filterOperator.contains, value);
    }

    return <Filter>
        <TextField
            onChange={handleChange}
            label={placeholder}
        />
    </Filter>
};

export { Text }