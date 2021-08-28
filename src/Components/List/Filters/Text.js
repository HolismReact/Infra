import Holism from "../../../Base/Holism";
import Filter from "./Filter";

const Text = ({ column, placeholder }) => {

    if (Holism.isNothing(placeholder)) {
        console.error(`placeholder is not provided in Text`);
    }

    if (Holism.isNothing(column)) {
        console.error(`column is not provided in Text`);
    }

    return <Filter
        type='text'
        column={column}
        placeholder={placeholder}
    >
        {
            ({ value, handleChange }) => {
                return <Input
                    value={value}
                    inputRef={htmlInput}
                    required={required ? true : false}
                    onChange={handleChange}
                />
            }
        }
        {/* <Input
        inputRef={htmlInput}
        required={required ? true : false}
        onChange={handleChange}
    /> */}
    </Filter>
};

export { Text }