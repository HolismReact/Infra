import CircularProgress from '@material-ui/core/CircularProgress';

const Progress = ({ size }) => {
    return size
        ?
        <CircularProgress
            size={size}
        />
        :
        <CircularProgress />
}

export { Progress }