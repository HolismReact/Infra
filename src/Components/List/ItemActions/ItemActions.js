import React from 'react';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

const ItemActions = ({
    entityType,
    item,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    upsert,
    setItem,
    reload
}) => {

    let clonedItemActions = [];

    if (itemActions) {
        let itemActionsArray = null;
        if (typeof itemActions === 'function') {
            itemActionsArray = itemActions(item).props.children
            if (itemActionsArray && itemActionsArray.props && itemActionsArray.props.children) {
                itemActionsArray = itemActionsArray.props.children
            }
        }
        else {
            itemActionsArray = itemActions.props.children
        }

        if (itemActionsArray) {
            clonedItemActions = React
                .Children
                .toArray(itemActionsArray).map(itemAction => React.cloneElement(itemAction, {
                    item: item,
                    setItem: setItem,
                    reload: reload
                }))
        }
    }



    return <>
        {
            clonedItemActions.map((itemAction, index) => <span key={index}>{itemAction}</span>)
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
            /*
                upsert={UpsertEntity}
                hasEdit={true}
                edit={(entity) => `/entity/edit/${entity.id}`}
                edit={EditEntity}

                either upsert, or edit URL, or edit component, or create + hasEdit
            */
            (hasEdit && create) || edit || upsert
                ?
                <EditAction
                    entityType={entityType}
                    item={item}
                    create={create}
                    hasEdit={hasEdit}
                    edit={edit}
                    upsert={upsert}
                />
                :
                null
        }
    </>
}

export default ItemActions;