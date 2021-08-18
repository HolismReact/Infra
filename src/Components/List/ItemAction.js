import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const getIcon = ({ icon, click }) => {
    switch (typeof icon) {
        case 'object':
            return <IconButton onClick={click}>{icon}</IconButton>
        case 'function':
            return <IconButton>{icon(click)}</IconButton>;
        case 'string':
            if (icon.indexOf('svg') > -1) {
                return { icon }
            }
            return <Icon>{icon}</Icon>
        default:
            return <span>Iconless</span>
    }
}

const ItemAction = ({ icon, click }) => {

    return <span className="itemAction">
        {
            getIcon({ icon, click })
        }
    </span>
};

export { ItemAction }