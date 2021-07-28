import { get } from "../../Base/Api";
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Filtering from "./ListComponents/Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./ListComponents/Sorting";
import Items from "./ListComponents/Items";
import ListActions from "./ListComponents/ListActions";

export const ListContext = React.createContext({
  listParameters: {},
  reloadItems: () => { }
});

const List = (props) => {

  const [listParameters, setListParameters] = useState(CreateListParameters());

  return <>
    <ListContext.Provider value={{
      listParameters: listParameters,
      reloadItems: () => { }
    }}>
      <div>{props.title}</div>
      <Filtering filters={props.filters} />
      <Sorting sorts={props.sorts} />
      <ListActions actions={props.listActions} />
      <Items entity={props.entity} headers={props.headers} row={props.row} card={props.card} />
      {/* <div>
        {data.map(item => <div key={item.id}>{item.id}</div>)}
      </div> */}
    </ListContext.Provider>
  </>
};

export default List;