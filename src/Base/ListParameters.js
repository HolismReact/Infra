const listParameters = {
    pageNumber: 1,
    pageSize: 10,
    filters: [],
    sorts: [],
    addFilter: (property, operator, value) => {

    },
    addSort: (property, direction) => {

    },
    create: function() {
        return listParameters;
    }
}

export default listParameters;