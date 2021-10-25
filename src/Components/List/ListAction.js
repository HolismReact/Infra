import React, { useState, useContext } from 'react';
import { ListContext } from './List';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import app from '../../Base/App';
import HolismIcon from '../HolismIcon';

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
            startIcon={
                progress
                    ?
                    <CircularProgress
                        size={20}
                    />
                    :
                    HolismIcon({ icon })
                // <CircularProgress
                //     variant="determinate"
                //     value={100}
                //     size={20}
                // />

            }
            /* HolismIcon creates 321 error in production build */
            onClick={() => click({ setProgress, reloadList })}
            className='mr-2 mt-2 lg:mt-0'
        >
            {app.t(title)}
        </Button>
    </span>
};

export { ListAction }