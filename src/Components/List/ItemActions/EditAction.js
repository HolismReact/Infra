import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ItemAction } from '@List';
import { app } from '@List';
import { useNavigate } from 'react-router-dom';

const EditAction = ({
    entityType,
    item,
    hasEdit,
    creationComponent,
    editionComponent,
    upsertComponent
}) => {

    const navigate = useNavigate();

    const manageEdition = (component) => {
        if (typeof component === 'function') {
            var result = component(item);
            if (result === 'object') {
                app.emit(app.editRequested, {
                    entityType: entityType,
                    entityType: item,
                });
            }
            else if (typeof result === 'string') {
                navigate(result);
            }
            else {
                app.error('what is this component?');
            }
        }
        else if (typeof component === 'string') {
            navigate(component);
        }
        else {
            app.error('what is this component?');
        }
    }

    return <>
        <ItemAction
            icon={<EditIcon style={{ color: '#10B981' }} />}
            click={() => {
                if (editionComponent) {
                    manageEdition(editionComponent);
                }
                else if (upsertComponent) {
                    manageEdition(upsertComponent);
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