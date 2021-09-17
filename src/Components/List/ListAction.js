import React from 'react';
import Button from '@material-ui/core/Button';
import HolismIcon from '../HolismIcon';

const ListAction = ({ icon, title, act }) => {
    return <Button
        variant="outlined"
        startIcon={HolismIcon({ icon })}
        onClick={act}
        className='ml-2'
    >
        {title}
    </Button>
};

export { ListAction }