import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { HolismIcon, app } from '@List';
import { DialogForm } from '@Form';
import { Dialog as HolismDialog } from '@Panel'

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

    const Dialog = dialog ? React.cloneElement(dialog, {
        entityId: item.id,
        dialogPurpose: title
    }) : null;

    // app.analyzeComponent(Dialog)

    const [progress, setProgress] = useState(false);

    return <span className="itemAction flex items-center justify-center">
        {
            (progress || progress === true)
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
                            app.emit(app.itemActionDialogRequested, {
                                entity: item,
                                purpose: title
                            })
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
        {
            dialog
                ?
                Dialog
                :
                null
        }
    </span>
};

export { ItemAction }