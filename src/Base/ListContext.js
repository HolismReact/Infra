import React, { useContext } from 'react'
import ListParameters from './ListParameters'

const listParameters = ListParameters.create();
const ListContext = React.createContext(listParameters);

export function useListContext() {
    return useContext(ListContext);
}

export function ListContextProvider({ children }) {
    return <ListContext.Provider value={listParameters}>
        {children}
    </ListContext.Provider>
}