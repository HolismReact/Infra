import React, { useContext } from 'react';
import { ListContext } from './List';
import Button from '@material-ui/core/Button';
import app from '../../Base/App';

const Filtering = ({ filters }) => {

    const { listParameters } = useContext(ListContext);

    if (!filters || filters.props.children.length === 0) {
        return <div></div>
    }

    const applyFilters = () => {
        app.emit(app.reloadRequirement);
    };

    const resetFilters = () => {
        listParameters.filters = [];
        applyFilters();
    }

    const handleKeyPress = (event) => {
        if (event.charCode != 13) {
            return;
        }
        applyFilters();
    }

    const filtersArray = filters.props.children.map ? filters.props.children : [filters.props.children];

    return <div id='filtering' className="bg-white p-6 md:rounded-lg relative" onKeyPress={(event) => handleKeyPress(event)}>
        <div className="flex flex-wrap ">
            {
                filtersArray.map((filter, index) => React.cloneElement(filter, {
                    key: index,
                    className: "ml-4"
                }))
            }
        </div>
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