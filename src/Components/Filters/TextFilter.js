import Holism from "../../Base/Holism";
import TextField from '@material-ui/core/TextField';
import { useListContext } from "../../Base/ListContext";

const TextFilter = ({ column, placeholder }) => {

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in TextFilter`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in TextFilter`);
    }
    
    const listContext = useListContext();

    const handleChange = (event) => {
        const value = event.target.value;
        
    }

    return <TextField
        onChange={handleChange}
        lable={placeholder}
    />
};

export default TextFilter;