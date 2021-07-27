import React, { useContext } from 'react'

const ListParametersContext = React.createContext({ name: 'listParametersDefaultValue' });

export function useListParameters() {
    return useContext(ListParametersContext);
}

export function ListParametersProvider({ children }) {
    return <ListParametersContext.Provider value={{}}>
        {children}
    </ListParametersContext.Provider>
}