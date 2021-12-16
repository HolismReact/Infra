import React, { useState, useContext } from 'react';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { app, post } from '../List';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HolismIcon from '../../HolismIcon';

const BooleanProperty = ({
    column,
    title,
    value,
    action
}) => {

    const [progress, setProgress] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || false);

    const reload = () => {
        app.emit(app.reloadRequested);
    }

    const onChange = (e) => {
        console.log(e);
        if (!action || app.isNothing(action)) {
            return;
        }
        setProgress(true);
        var url = action;
        if (typeof action === 'function') {
            url = action(e.target.checked);
        }
        post(url).then(data => {
            setProgress(false);
            app.success('Applied');
            setCurrentValue(data.isActive);
        }, error => {
            app.error(error);
            setProgress(false);
        });
    }

    const control = action
        ?
        <Switch
            checked={currentValue || false}
            onChange={(e) => onChange(e)}
            inputProps={{ 'aria-label': title }}
        />
        :
        <div className={"" + (value === true ? " text-green-600 " : " text-red-600 ")}>
            {
                value === true
                    ?
                    <HolismIcon icon={CheckIcon} />
                    :
                    <HolismIcon icon={ClearIcon} />
            }
        </div>
    return <div className="property boolean ">
        {
            progress
                ?
                <CircularProgress
                    size={33}
                />
                :
                title
                    ?
                    <Tooltip title={title || ""}>
                        {
                            control
                        }
                    </Tooltip>
                    :
                    control
        }
    </div>
}

export { BooleanProperty }