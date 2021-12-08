import app from "../../../Base/App";
import Filter from "./Filter";
import Input from '@mui/material/Input';

const Text = ({ column, placeholder }) => {

    return <Filter
        type='text'
        column={column}
        placeholder={app.t(placeholder)}
        renderInput={(value, setValue) => {
            return <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        }}
    >
        {/* {
            ({ value, handleChange }) => {
                return <Input
                    value={value}
                    // inputRef={htmlInput}
                    onChange={handleChange}
                />
            }
        } */}
        {/* <Input
        inputRef={htmlInput}
        required={required ? true : false}
        onChange={handleChange}
    /> */}
    </Filter>
};

export { Text }