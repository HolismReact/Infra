import TextField from '@material-ui/core/TextField';

const Text = ({ column, required, placeholder, hint }) => {
    return <div className='field'>
        <TextField
            label={placeholder}
            required={required ? true : false}
            helperText={hint}
        />
    </div>
};

export default Text;