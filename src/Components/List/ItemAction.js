import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import HolismIcon from '../HolismIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState } from 'react';
import { app } from './List';

const ItemAction = ({ title, item, icon, click, goTo, dialog, setItem, color }) => {

    const history = useHistory();

    const [progress, setProgress] = useState(false);

    return <span className="itemAction">
        {
            (progress || progress == true)
                ?
                <CircularProgress />
                :
                <Tooltip title={app.t(title || "")}>
                    <IconButton onClick={() => {
                        if (goTo) {
                            if (typeof goTo === 'function') {
                                history.push(goTo(item));
                            }
                            else {
                                history.push(goTo);
                            }
                        }
                        else if (click && typeof click === 'function') {
                            click({ item, setProgress, setItem })
                        }
                        else if (dialog) {
                            console.info('showing dialog ...');
                        }
                        else {
                            console.warn(`No action is assigned to item action. Title is '${title}'`)
                        }
                    }}>
                        {
                            <HolismIcon
                                icon={icon}
                                className={color}
                            />
                            // <CircularProgress
                            //     variant="determinate"
                            //     value={100}
                            //     size={20}
                            // />
                        }
                    </IconButton>
                </Tooltip>
        }
    </span>
};

export { ItemAction }