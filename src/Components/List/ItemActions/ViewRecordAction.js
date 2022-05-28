import React from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { ItemAction } from '@List';
import { app } from '@List';

const ViewRecordAction = ({
    entityType,
    item
}) => {

    const manageEdition = () => {
        app.emit(app.editRequested, {
            entityType: entityType,
            entity: item,
        });
    }

    return <>
        <ItemAction
            icon={<DataObjectIcon style={{ color: 'rgb(37 99 235)' }} />}
            click={manageEdition}
        />
    </>
}

export default ViewRecordAction;