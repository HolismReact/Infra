import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HolismIcon from '../HolismIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import app from '../../Base/App';

const ListAction = ({ icon, title, click }) => {

    const [progress, setProgress] = useState(false);

    const reloadList = () => {
        app.emit(app.reloadRequirement)
    }

    return <span className="listAction"> {
        (progress == true)
            ?
            <CircularProgress />
            :
            <Button
                variant="outlined"
                startIcon={HolismIcon({ icon })}
                onClick={() => click({ setProgress, reloadList })}
                className='ml-2'
            >
                {title}
            </Button>
    }
    </span>
};

export { ListAction }