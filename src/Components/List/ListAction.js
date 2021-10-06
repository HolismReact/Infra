import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HolismIcon from '../HolismIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import app from '../../Base/App';

const cardinalities = ['1', '>2'];

const ListAction = ({ icon, title, click, cardinality }) => {

    const [progress, setProgress] = useState(false);

    if (cardinality) {

    }

    const reloadList = () => {
        app.emit(app.reloadRequirement)
    }

    return <span className="listAction">
        <Button
            variant="outlined"
            disabled={progress}
            startIcon={
                progress
                    ?
                    <CircularProgress
                        size={20}
                    />
                    :
                    HolismIcon({ icon })
            }
            onClick={() => click({ setProgress, reloadList })}
            className='ml-2'
        >
            {title}
        </Button>
    </span>
};

export { ListAction }