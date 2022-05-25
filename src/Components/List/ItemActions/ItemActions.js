import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import { app } from '../../../Base/App';

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
    reload,
    className
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
                .toArray(itemActionsArray)
                .filter(itemAction => {
                    console.log(itemAction);
                    if (itemAction.props?.superAdmin === true) {
                        return app.isSuperAdmin()
                    }
                    else {
                        return true;
                    }
                })
                .map(itemAction => React.cloneElement(itemAction, {
                    item: item,
                    setItem: setItem,
                    reload: reload
                }))
        }
    }

    return <span className={className}>
        {
            item.progress
                ?
                <span className="flex flex-wrap items-center justify-end px-2">
                    <Fade in={item.progress}>
                        <CircularProgress size={24} className="mt-2" />
                    </Fade>
                </span>
                :
                <span className="flex flex-wrap items-center justify-end">
                    {/* <Fade in={!item.progress}> */}
                    <>
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
                    {/* </Fade> */}
                </span>
        }
    </span>
}

export default ItemActions;