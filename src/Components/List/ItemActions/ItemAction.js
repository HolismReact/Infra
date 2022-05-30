import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { HolismIcon, app, Unify } from '@List';

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

    let DialogInstanceCloned = null

    if (dialog) {
        const DialogInstance = dialog
        DialogInstanceCloned = React.cloneElement(<DialogInstance
            entity={item}
        />, {
            entityId: item.id,
            dialogPurpose: title
        })
    }

    const [progress, setProgress] = useState(false);

    return <span className="itemAction flex items-center justify-center">
        {
            (progress || progress === true)
                ?
                <CircularProgress size={24} className="m-2" />
                :
                <Tooltip title={app.t(title || "")}>
                    <IconButton onClick={(e) => {
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
                        e.stopPropagation()
                        e.preventDefault()
                        e.nativeEvent.stopPropagation()
                        e.nativeEvent.preventDefault()
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
            dialog && DialogInstanceCloned
        }
    </span>
};

export { ItemAction }