import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import HolismIcon from '../HolismIcon';

const ItemAction = ({ title, item, icon, click, goTo }) => {

    const history = useHistory();

    return <span className="itemAction">
        <Tooltip title={title || ""}>
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
                    HolismIcon({ icon })
                }
            </IconButton>
        </Tooltip>
    </span>
};

export { ItemAction }