import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import HolismIcon from '../HolismIcon';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { app } from './List';

const ItemAction = ({ title, item, icon, click, goTo, dialog, setItem, color }) => {

    const navigate = useNavigate();

    const [progress, setProgress] = useState(false);

    return <span className="itemAction">
        {
            (progress || progress == true)
                ?
                <CircularProgress />
                :
                <Tooltip title={app.t(title || "")}>
                    <IconButton onClick={() => {
                        app.selectedItem = item;
                        if (goTo) {
                            app.selectedItem = item;
                            if (typeof goTo === 'function') {
                                navigate(goTo(item));
                            }
                            else {
                                navigate(goTo);
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