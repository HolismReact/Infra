import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { ListContext } from './List';
import AddIcon from '@material-ui/icons/Add';
import HolismIcon from '../HolismIcon';

const ListActions = ({ actions, create, creationButton }) => {

    const { setIsCreationDialogOpen } = useContext(ListContext);

    const showCreationDialog = () => {
        setIsCreationDialogOpen(true);
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
                actions && typeof (actions) === 'function'
                    ?
                    actions()
                    :
                    null
            }
        </div>
    </div>
}

export default ListActions;