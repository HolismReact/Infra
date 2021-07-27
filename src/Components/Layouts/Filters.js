import Button from '@material-ui/core/Button'

const Filters = ({ filters }) => {

    // const [filtersJson, setFiltersJson] = useState([]);

    const applyFilters = () => {
        console.log(filters);
        for (var i = 0; i < filters.props.children.length; i++) {
            console.log(filters[i]);
        }
    };

    return <div id='filters'>
        {filters}
        <Button variant="contained">Remove Filters</Button>
        <Button variant="contained" color="primary" onClick={() => applyFilters()}>
            Apply
        </Button>
    </div>
}

export default Filters;