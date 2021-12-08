import Tooltip from '@mui/material/Tooltip';

const ValueWithTitle = ({ value, title }) => {
    return <div title={title || ""}>
        {value}
    </div>
}

export { ValueWithTitle }