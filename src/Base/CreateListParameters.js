const CreateListParameters = (userGuid, entity) => {
    var key = '';
    if (userGuid) {
        key += userGuid;
    }
    if (entity) {
        key += `_${entity}`;
    }
    key += '_listParameters';
    var value = window.localStorage.getItem(key);
    var existingParameters = (value === null ? {} : JSON.parse(value));
    const listParameters = {
        pageNumber: existingParameters.pageNumber || 1,
        pageSize: existingParameters.pageSize || 5,
        filters: existingParameters.filters || [],
        sorts: existingParameters.sorts || [],
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
        filtersQueryString: function () {
            //filters=title_contains_hi&stateId_eq_closed&userAge_gt_35
            var query = "";
            for (var i = 0; i < listParameters.filters.length; i++) {
                var filter = listParameters.filters[i];
                query += `&${filter.property}_${filter.operator}_${filter.value}`;
            }
            query = query.slice(1);
            return query;
        },
        sortsQueryString: function () {
            var query = "";
            for (var i = 0; i < listParameters.sorts.length; i++) {
                var sort = listParameters.sort[0];
                query += `&${sort.property}_${sort.direction}`;
            }
            query = query.slice(1);
            return query;
        },
        storeInLocalStorage: function () {
            window.localStorage.setItem(key, JSON.stringify(listParameters));
        }
    }
    return listParameters;
};

export default CreateListParameters;