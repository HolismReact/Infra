import React, { useState } from 'react';
import DeleteAction from './ItemActions/DeleteAction';
import EditAction from './ItemActions/EditAction';
import { ItemAction } from '@List';

const ItemActions = ({
    entityType,
    item,
    itemActions,
    hasDelete,
    hasEdit,
    editionComponent,
    creationComponent,
    upsertComponent,
    setItem,
    reload
}) => {

    return <>
        {
            itemActions ?
                React
                    .Children
                    .toArray(
                        (typeof itemActions === 'function')
                            ?
                            itemActions(item).props.children
                            :
                            itemActions.props.children
                    )
                    .map(itemAction => React.cloneElement(itemAction, {
                        item: item,
                        setItem: setItem,
                        reload: reload
                    }))
                :
                null
        }
        {
            hasDelete
                ?
                <DeleteAction
                    entityType={entityType}
                    item={item}
                />
                :
                null
        }
        {
            hasEdit || editionComponent || upsertComponent
                ?
                <EditAction
                    entityType={entityType}
                    item={item}
                    editionComponent={editionComponent}
                    creationComponent={creationComponent}
                />
                :
                null
        }
    </>
}

export default ItemActions;