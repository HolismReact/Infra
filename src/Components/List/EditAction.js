import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { ItemAction } from './ItemAction';

const EditAction = ({ entity, item, hasEdit, creationComponent, editionComponent }) => {
    return <ItemAction
        icon={<EditIcon />}
        click={() => {
            alert('edit requested');
        }}
    />
}

export default EditAction;