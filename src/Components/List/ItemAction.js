import IconButton from '@material-ui/core/IconButton';

const ItemAction = ({ icon, click }) => {

    return <span className="itemAction">
        {
            typeof icon === 'object'
                ?
                <IconButton onClick={click}>{icon}</IconButton>
                :
                null
        }
    </span>
};

export { ItemAction }