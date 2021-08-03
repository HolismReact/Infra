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

const List = ({ title, subtitle, breadcrumbItems, filters, listActions, sorts, entity, headers, row, card, create }) => {
  const [OpenModal, setOpenModal] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters());
  Holism.emit(Holism.componentLoaded, {
    pageTitle: title,
    pageSubtitle: subtitle,
    breadcrumbItems: breadcrumbItems
  });

  return <ListContext.Provider value={{
    OpenModal,
    setOpenModal,
    listParameters: listParameters,
    reloadItems: () => { }
  }} id='list' className="bg-white p-6 rounded-lg">

    <Filtering filters={filters} />
    <div className='flex items-center justify-between'>
      <ListActions actions={listActions} create={create} />
      {
        sorts
          ?
          <Sorting sorts={sorts} />
          :
          null
      }
    </div>
    <Items entity={entity} headers={headers} row={row} card={card} />
  </ListContext.Provider>
};

export { List };
export { Text } from './Filters/Text';
export { Enum } from './Filters/Enum';
export { Ascending } from './Sorts/Ascending';
export { ListAction } from './ListActions/ListAction';
export { ItemAction } from './ItemActions/ItemAction';
