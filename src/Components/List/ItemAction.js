import IconButton from '@material-ui/core/IconButton';

const ItemAction = ({ icon }) => {

    return <span className="itemAction">
        {
            typeof icon === 'object'
                ?
                <IconButton>{icon}</IconButton>
                :
                null
        }
    </span>
};

export { ItemAction }