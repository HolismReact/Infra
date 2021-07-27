const CreateListParameters = () => {
    const listParameters = {
        pageNumber: 1,
        pageSize: 10,
        filters: [],
        sorts: [],
        addFilter: (property, operator, value) => {
            var isAdded = false;
            for (var i = 0; i < listParameters.filters.length; i++) {
                if (listParameters.filters[i].property === property) {
                    if (listParameters.filters[i].operator && operator && listParameters.filters[i].operator === operator) {
                        listParameters.filters[i].value = value;
                        isAdded = true;
                    }
                }
            }
            if (!isAdded) {
                listParameters.filters.push({ property: property, operator: operator, value: value });
            }
        },
        addSort: (property, direction) => {

        },
        create: function () {
            return listParameters;
        },
        filtersQueryString: function() {
            var query = "";
            for (var i = 0; i < listParameters.filters.length; i++) {
                var filter = listParameters.filters[i];
                query += `&${filter.property}_${filter.operator}_${filter.value}`;
            }
            query = query.slice(1);
            return query;
        }
    }
    return listParameters;
};

export default CreateListParameters;