import HolismIcon from "../../Components/HolismIcon"
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import React, { useState } from 'react';
import Holism from "../../Base/Holism";
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const HeaderAction = ({ icon, title, url, action, component }) => {

    const history = useHistory();

    const Component = component || (() => <div>NA</div>);

    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        if (url && Holism.isSomething(url)) {
            history.push(url);
        }
        else if (action && (typeof action === 'function')) {
            action()
        }
        else if (component) {
            setShowComponent(!showComponent)
        }
        else {
            console.warn('No action is defined for HeaderAction');
        }
    }

    return <>
        <Tooltip title={title || ""}>
            <div
                onClick={() => handleClick()}
                className='text-gray-600 cursor-pointer hover:text-blue-500'
            >
                <HolismIcon icon={icon} />
            </div>
        </Tooltip>

        {/* This part is not working */}
        <ClickAwayListener onClickAway={() => setShowComponent(false)}>
            <div>
                <Fade in={showComponent}>
                    <div>
                        <Component />
                    </div>
                </Fade>
            </div>
        </ClickAwayListener>
    </>
}

export { HeaderAction }