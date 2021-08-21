import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { ItemAction } from './ItemAction';
import Holism from '../../Base/Holism';
import { useHistory } from 'react-router-dom';

const EditAction = ({ entity, item, hasEdit, creationComponent, editionComponent }) => {

    var history = useHistory();

    return <>
        <ItemAction
            icon={<EditIcon style={{ color: '#10B981' }} />}
            click={() => {
                if (editionComponent) {
                    if (typeof editionComponent === 'function') {
                        var result = editionComponent(item);
                        if (result === 'object') {
                            Holism.emit(Holism.editRequested, { type: 'dialog', item: item });
                        }
                        else if (typeof result === 'string') {
                            history.push(result);
                        }
                        else {
                            Holism.error('what is this component?');
                        }
                    }
                    else if (typeof editionComponent === 'string') {
                        history.push(editionComponent);
                    }
                    else {
                        Holism.error('what is this component?');
                    }
                }
                else if (hasEdit) {
                    if (!creationComponent) {
                        Holism.error('what is this component?');
                    }
                    else {
                        Holism.emit(Holism.editRequested, { type: 'dialog', item: item });
                    }
                }
            }}
        />
    </>
}

export default EditAction;