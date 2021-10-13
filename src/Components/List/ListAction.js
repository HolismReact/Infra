import React, { useState, useContext } from 'react';
import { ListContext } from './List';
import Button from '@material-ui/core/Button';
import HolismIcon from '../HolismIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import app from '../../Base/App';

const ListAction = ({ icon, title, click, minCardinality }) => {

    const [progress, setProgress] = useState(false);
    const { selectedItems } = useContext(ListContext);

    const reloadList = () => {
        app.emit(app.reloadRequirement)
    }

    return <span className="listAction">
        <Button
            variant="outlined"
            disabled={progress || (minCardinality && minCardinality > selectedItems.length)}
            // startIcon={
            //     progress
            //         ?
            //         <CircularProgress
            //             size={20}
            //         />
            //         :
            //         HolismIcon({ icon })
            // }
            startIcon={<CircularProgress size={20} />}
            /* HolismIcon creates 321 error in production build */
            onClick={() => click({ setProgress, reloadList })}
            className='mr-2 mt-2 lg:mt-0'
        >
            {title}
        </Button>
    </span>
};

export { ListAction }