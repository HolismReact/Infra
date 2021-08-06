import React, { useState } from 'react';
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

const toggleFilteringIcon = <svg
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

const List = ({ title, subtitle, breadcrumbItems, filters, listActions, sorts, entity, headers, row, card, create }) => {
  const [OpenModal, setOpenModal] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters());
  const [isFilteringOpen, setIsFilteringOpen] = useState();

  Holism.emit(Holism.componentLoaded, {
    pageTitle: title,
    pageSubtitle: subtitle,
    breadcrumbItems: breadcrumbItems
  });

  const toggleFiltering = () => {
    setIsFilteringOpen(!isFilteringOpen);
  }

  return <ListContext.Provider value={{
    OpenModal,
    setOpenModal,
    listParameters: listParameters,
    reloadItems: () => { }
  }} id='list'>

    {
      isFilteringOpen
        ?
        <Filtering filters={filters} />
        :
        null
    }

    <div className='flex items-center justify-between px-6'>
      <ListActions actions={listActions} create={create} />
      <div className="flex items-center">
        {
          sorts
            ?
            <Sorting sorts={sorts} />
            :
            null
        }
        {
          filters && filters.length && filters.length > 0
            ?
            <span
              id='showHideFiltering'
              className="text-gray-700 hover:text-blue-500 cursor-pointer"
              onClick={toggleFiltering}>{toggleFilteringIcon}</span>
            :
            null
        }
      </div>
    </div>

    <Items entity={entity} headers={headers} row={row} card={card} />
  </ListContext.Provider>
};

export { List };
export { Text } from './Filters/Text';
export { Enum } from './Filters/Enum';
export { Ascending } from './Sorts/Ascending';
export { ListAction } from './ListAction';
export { ItemAction } from './ItemAction';
