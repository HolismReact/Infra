import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';

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

const ItemAction = ({ item, icon, click, goTo }) => {

    const history = useHistory();

    return <span className="itemAction">
        <IconButton onClick={() => {
            if (goTo) {
                if (typeof goTo === 'function') {
                    history.push(goTo(item));
                }
                else {
                    history.push(goTo);
                }
            }
            else {
                click(item)
            }
        }}>
            {
                getIcon({ icon })
            }
        </IconButton>
    </span>
};

export { ItemAction }