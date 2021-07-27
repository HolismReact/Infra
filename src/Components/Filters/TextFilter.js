import Holism from "../../Base/Holism";
import TextField from '@material-ui/core/TextField';
import { useListParameters } from "../../Base/ListParametersContext";

const TextFilter = ({ column, placeholder }) => {

    var listParameters = useListParameters();

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value);
    }

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in TextFilter`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in TextFilter`);
    }

    return <TextField
        onChange={handleChange}
        lable={placeholder}
    />
};

export default TextFilter;