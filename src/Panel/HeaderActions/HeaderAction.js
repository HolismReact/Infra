import HolismIcon from "../../Components/HolismIcon"
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import React, { useState } from 'react';
import app from "../../Base/App";
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const HeaderAction = ({ icon, title, url, action, component, ...rest }) => {

    const history = useHistory();

    const Component = component || (() => <div></div>);

    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        if (url && app.isSomething(url)) {
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

    return <div className="headerAction relative select-none">
        <Tooltip title={app.t(title || "")}>
            <div
                //rest
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className={
                    'text-gray-600 cursor-pointer hover:text-blue-500'
                    + (app.isRtl() ? " mr-4 " : " ml-4 ")
                }
            >
                <HolismIcon icon={icon} />
            </div>
        </Tooltip>

        <ClickAwayListener onClickAway={() => setShowComponent(false)}>
            <div>
                <Fade in={showComponent}>
                    <div
                        className={
                            "absolute top-10 z-50 shadow-xl"
                            + (app.isRtl() ? " left-0 " : " right-0 ")
                        }
                    >
                        <Component />
                    </div>
                </Fade>
            </div>
        </ClickAwayListener>
    </div>
}

export { HeaderAction }