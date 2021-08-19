import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { ListContext } from './List';
import AddIcon from '@material-ui/icons/Add';

const ListActions = ({ actions, create }) => {

    const { setIsCreationDialogOpen } = useContext(ListContext);

    const showCreationDialog = () => {
        setIsCreationDialogOpen(true);
    }

    return <div id='listActions' className='flex items-center'>
        <div>
            {
                create
                    ?
                    <Button
                        className="bg-green-200 hover:bg-green-400"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={showCreationDialog}
                    >
                        Create
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