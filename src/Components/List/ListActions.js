import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { ListContext } from './List';
import AddIcon from '@material-ui/icons/Add';
import HolismIcon from '../HolismIcon';

const ListActions = ({ actions, create, creationButton }) => {

    const { setIsCreationDialogOpen, selectedItems } = useContext(ListContext);

    const showCreationDialog = () => {
        setIsCreationDialogOpen(true);
    }

    let clonedListActions = null;
    let actionItems = null;

    if (typeof actions === 'function') {
        var actionsReturn = actions(selectedItems);
        if (actionsReturn.props.children) {
            actionItems = actionsReturn.props.children;
        }
        else {
            actionItems = actionsReturn;
        }
    }
    else {
        if (actions) {
            if (actions.props.children) {
                actionItems = actions.props.children;
            }
            else {
                actionItems = actions;
            }
        }
    }

    if (actionItems) {
        clonedListActions =
            React
                .Children
                .toArray(actionItems)
                .map(listAction => React.cloneElement(listAction, {

                }))
    }

    return <div id='listActions' className='flex flex-wrap items-center'>
        <div>
            {
                create
                    ?
                    <Button
                        className="bg-green-200 hover:bg-green-400"
                        variant="outlined"
                        startIcon={
                            (creationButton && creationButton.icon)
                                ?
                                <HolismIcon icon={creationButton.icon} />
                                :
                                <AddIcon />
                        }
                        onClick={showCreationDialog}
                    >
                        {
                            (creationButton && creationButton.text)
                                ?
                                creationButton.text
                                :
                                "Create"
                        }
                    </Button>
                    :
                    null
            }
        </div>
        <div>
            {
                clonedListActions.map((action, index) => {
                    if (action.props.minCardinality) {
                        if (selectedItems.length >= action.props.minCardinality)
                        {
                            return <span key={index}>
                                {
                                    action
                                }
                            </span>
                        }
                        return null;
                    }
                    else {
                        return <span key={index}>
                            {
                                action
                            }
                        </span>
                    }
                })
            }
        </div>
    </div>
}

export default ListActions;