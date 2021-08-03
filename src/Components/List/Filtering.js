import { useContext, useState } from 'react';
import { ListContext } from './List';
import Button from '@material-ui/core/Button';

const Filtering = ({ filters }) => {

    var { listParameters, reloadItems } = useContext(ListContext);

    const applyFilters = () => {
        reloadItems();
    };

    const resetFilters = () => {
        listParameters.filters = [];
        applyFilters();
    }

    return <div id='filtering' className="bg-white p-6 rounded-lg relative">
        {filters}
        <div className="flex justify-end mt-6">
            <Button
                variant="outlined"
                onClick={resetFilters}>
                Reset
            </Button>
            <Button
                className="bg-green-200 hover:bg-green-400 ml-2"
                variant="outlined"
                onClick={applyFilters}>
                Apply
            </Button>
        </div>
    </div>
}

export default Filtering;