import React from 'react';
import Button from '@material-ui/core/Button';

const add = <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>

const ListActions = ({ actions, create }) => {
    return <div id='listActions' className='flex items-center'>
        <div>
            {
                create
                    ?
                    <Button
                        className="bg-green-200 hover:bg-green-400"
                        variant="outlined"
                        startIcon={add}
                    >
                        Create
                    </Button>
                    :
                    null
            }
        </div>
        <div>
            {actions()}
        </div>
    </div>
}

export default ListActions;