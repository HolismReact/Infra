import { useContext } from 'react';
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

    return <div id='filtering' className="bg-white p-6 rounded-lg">
        {filters}
        <Button variant="contained" onClick={resetFilters}>
            Remove Filters
        </Button>
        <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply
        </Button>
    </div>
}

export default Filtering;