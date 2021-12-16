import React, { useState } from 'react';
import { ItemAction } from './ItemAction';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

const ItemActions = ({ entity, item, itemActions, hasDelete, hasEdit, editionComponent, creationComponent, setItem, reload }) => {

    const [something, setSomething] = useState();

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
                <DeleteAction entity={entity} item={item} />
                :
                null
        }
        {
            hasEdit || editionComponent
                ?
                <EditAction entity={entity} item={item} editionComponent={editionComponent} creationComponent={creationComponent} />
                :
                null
        }
    </>
}

export default ItemActions;