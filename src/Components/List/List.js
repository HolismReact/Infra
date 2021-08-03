import React, { useEffect, useState, useContext, useCallback } from 'react';
import Filtering from "./Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./Sorting";
import Items from "./Items";
import ListActions from "./ListActions";
import Holism from '../../Base/Holism';

export const ListContext = React.createContext({
  OpenModal: false,
  setOpenModal: () => { },
  listParameters: {},
  reloadItems: () => { }
});

const List = (props) => {
  const [OpenModal, setOpenModal] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters());
  Holism.emit(Holism.componentLoaded, {
    pageTitle: props.title,
    pageSubtitle: props.subtitle,
    breadcrumbItems: props.breadcrumbItems
  });

  return <ListContext.Provider value={{
    OpenModal,
    setOpenModal,
    listParameters: listParameters,
    reloadItems: () => { }
  }} id='list' className="bg-white p-6 rounded-lg">

    <Filtering filters={props.filters} />
    <Sorting sorts={props.sorts} />
    <ListActions actions={props.listActions} />
    <Items entity={props.entity} headers={props.headers} row={props.row} card={props.card} />
    <props.create />
  </ListContext.Provider>
};

export { List };
export { Text } from './Filters/Text';
export { Enum } from './Filters/Enum';
export { Ascending } from './Sorts/Ascending';
export { ListAction } from './ListActions/ListAction';
export { ItemAction } from './ItemActions/ItemAction';
