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

    const [progress, setProgress] = useState(false);

    let Dialog = dialog;
    if (dialog) {
        const result = dialog(item)
        const name = result.type.name
        // console.log('dialog element name ', name);
        if (name === 'Form') {
            Dialog = <DialogForm
                entityType={result.props?.entityType}
                title={result.props?.title}
                explanations={result.props.explanations}
                inputs={result.props?.inputs}
                actions={result.props?.actions}
                large={result.props?.large}
                okAction={result.props?.okAction}
                entityId={item.id}
                dialogPurpose={title}
            />
        }
        else if (name === 'Dialog') {
            Dialog = <HolismDialog
                title={result.props?.title}
                content={result.props?.content}
                actions={result.props?.actions}
                large={result.props?.large}
                entityId={item.id}
                dialogPurpose={title}
            />
        }
    }

    // console.log(title)
    // app.analyzeComponent(Dialog)

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