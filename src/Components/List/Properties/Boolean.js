import React, { useState, useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { app, post } from '../List';
import CircularProgress from '@material-ui/core/CircularProgress';

const Boolean = ({
    column,
    title,
    value,
    action
}) => {

    const [progress, setProgress] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || false);

    const onChange = () => {
        if (!action || app.isNothing(action)) {
            return;
        }
        setProgress(true);
        post(action).then(data => {
            setProgress(false);
            app.success('Applied');
            setCurrentValue(!currentValue);
        }, error => {
            app.error(error);
            setProgress(false);
        });
    }

    const control = <Switch
        checked={currentValue}
        onChange={() => { }}
        inputProps={{ 'aria-label': title }}
    />
    return <div className="property boolean ">
        {
            progress 
            ?
            <CircularProgress />
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

export { Boolean }