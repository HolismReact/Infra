import React, { useState } from 'react';
import { ItemAction } from './ItemAction';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

const ItemActions = ({ entity, item, itemActions, hasDelete, hasEdit, editionComponent, creationComponent }) => {
    return <>
        {
            React.Children.toArray(itemActions.props.children).map(itemAction => React.cloneElement(itemAction, {
                item: item
            }))
        }
        {
            hasDelete
                ?
                <DeleteAction entity={entity} item={item} />
                :
                null
        }
        {
            hasEdit || editionComponent
                ?
                <EditAction entity={entity} item={item} editComponent={editionComponent} createComponent={creationComponent} />
                :
                null
        }
    </>
}

export default ItemActions;