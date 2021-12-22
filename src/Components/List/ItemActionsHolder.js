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
    edit,
    create,
    upsert,
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