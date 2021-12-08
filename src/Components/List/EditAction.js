import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ItemAction } from './ItemAction';
import app from '../../Base/App';
import { useNavigate } from 'react-router-dom';

const EditAction = ({ entity, item, hasEdit, creationComponent, editionComponent }) => {

    const navigate = useNavigate();

    return <>
        <ItemAction
            icon={<EditIcon style={{ color: '#10B981' }} />}
            click={() => {
                if (editionComponent) {
                    if (typeof editionComponent === 'function') {
                        var result = editionComponent(item);
                        if (result === 'object') {
                            app.emit(app.editRequested, { type: 'dialog', item: item });
                        }
                        else if (typeof result === 'string') {
                            navigate(result);
                        }
                        else {
                            app.error('what is this component?');
                        }
                    }
                    else if (typeof editionComponent === 'string') {
                        navigate(editionComponent);
                    }
                    else {
                        app.error('what is this component?');
                    }
                }
                else if (hasEdit) {
                    if (!creationComponent) {
                        app.error('what is this component?');
                    }
                    else {
                        app.emit(app.editRequested, { type: 'dialog', item: item });
                    }
                }
            }}
        />
    </>
}

export default EditAction;