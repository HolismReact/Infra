import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const getIcon = ({ icon }) => {
    switch (typeof icon) {
        case 'object':
            return icon
        case 'function':
            return icon()
        case 'string':
            if (icon.indexOf('svg') > -1) {
                return icon;
            }
            return <Icon>{icon}</Icon>;
        default:
            return <span>Iconless</span>;
    }
}

const ItemAction = ({ item, icon, click }) => {

    return <span className="itemAction">
        <IconButton onClick={() => click(item)}>{getIcon({ icon })}</IconButton>
    </span>
};

export { ItemAction }