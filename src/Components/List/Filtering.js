import { useContext, useState } from 'react';
import { ListContext } from './List';
import Button from '@material-ui/core/Button';

const filterIcon = <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="h-6 w-6"
    viewBox="0 0 24 24"
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    ></path>
</svg>

const Filtering = ({ filters }) => {

    var { listParameters, reloadItems } = useContext(ListContext);
    const [isOpen, setIsOpen] = useState();

    const applyFilters = () => {
        reloadItems();
    };

    const resetFilters = () => {
        listParameters.filters = [];
        applyFilters();
    }

    const toggleFiltering = () => {
        setIsOpen(!isOpen);
    }

    return <div className="relative">
        <div id='showHideFiltering' className="absolute -top-8 right-4 text-gray-500 hover:text-blue-500 cursor-pointer" onClick={toggleFiltering}>
            {filterIcon}
        </div>
        {
            isOpen
                ?
                <div id='filtering' className="bg-white p-6 rounded-lg relative">
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
                :
                null
        }

    </div>
}

export default Filtering;