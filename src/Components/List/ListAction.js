import React from 'react';
import Button from '@material-ui/core/Button';

const ListAction = ({icon, title, act}) => {
    return <Button
        variant="outlined"
        startIcon={icon}
        onClick={act}
        className='ml-2'
    >
        {title}
    </Button>
};

export { ListAction }