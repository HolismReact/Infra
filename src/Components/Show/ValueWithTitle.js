import Tooltip from '@material-ui/core/Tooltip';

const ValueWithTitle = ({ value, title }) => {
    return <div title={title || ""}>
        {value}
    </div>
}

export { ValueWithTitle }