import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { HolismIcon, app } from '@List';

const ItemAction = ({
    title,
    item,
    icon,
    click,
    goTo,
    dialog,
    setItem,
    reload,
    color,
    hoverOnly
}) => {

    const navigate = useNavigate();

    const [progress, setProgress] = useState(false);

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    return <span className="itemAction flex items-center justify-center">
        {
            (progress || progress == true)
                ?
                <CircularProgress size={24} className="m-2" />
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
                            click({ item, setProgress, setItem, reload })
                        }
                        else if (dialog) {
                            const DialogProp = dialog;
                            <DialogProp open={dialogIsOpen} />
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