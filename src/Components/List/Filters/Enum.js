import Holism from "../../../Base/Holism";
import TextField from '@material-ui/core/TextField';

const Enum = ({ column, placeholder }) => {

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in TextFilter`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in TextFilter`);
    }

    return <TextField
        lable={placeholder}
    />
};

export { Enum }