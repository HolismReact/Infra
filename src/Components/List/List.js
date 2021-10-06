import React, { useState, useEffect } from 'react';
import Filtering from "./Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./Sorting";
import Items from "./Items";
import ListActions from "./ListActions";
import app from '../../Base/App';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from './Filters/Filter';
import CachedIcon from '@material-ui/icons/Cached';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import Collapse from '@material-ui/core/Collapse';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

export const ListContext = React.createContext({
  isCreationDialogOpen: false,
  setIsCreationDialogOpen: () => { },
  listParameters: {},
  selectedItems: [],
  setSelectedItems: () => {}
});

const List = ({ title, subtitle, breadcrumbItems, filters, listActions, sorts, entity, headers, row, card, create, itemActions, hasDelete, hasEdit, edit, creationButton }) => {
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters(app.userGuid(), entity));
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entity}_isFilteringOpen`);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    app.emit(app.componentLoaded, {
      pageTitle: title,
      pageSubtitle: subtitle,
      breadcrumbItems: breadcrumbItems
    });
  }, []);

  const toggleFiltering = () => {
    setIsFilteringOpen(!isFilteringOpen);
  }

  return <ListContext.Provider value={{
    isCreationDialogOpen,
    setIsCreationDialogOpen,
    listParameters: listParameters,
    selectedItems: selectedItems,
    setSelectedItems:  setSelectedItems
  }} id='list'>

    <div className='lg:flex items-center justify-between px-6 py-2'>
      <ListActions
        actions={listActions}
        create={create}
        creationButton={creationButton}
      />
      <div className="sortAndFilteringAndReload flex items-center justify-end my-4 lg:my-0">
        {
          sorts
            ?
            <Sorting sorts={sorts} />
            :
            null
        }
        {
          filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)
            ?
            <span
              id='showHideFiltering'
              className={listActionIconStyle + " mr-4"}
              onClick={toggleFiltering}><FilterListIcon /></span>
            :
            null
        }
        {
          <span
            id='reload'
            onClick={() => app.emit(app.reloadRequirement)}
            className={listActionIconStyle}
          >
            <CachedIcon />
          </span>
        }
      </div>
    </div>

    <Collapse in={isFilteringOpen}>
      <div className='mb-2'>
        <Filtering filters={filters} />
      </div>
    </Collapse>

    <Items
      entity={entity}
      create={create}
      headers={headers}
      row={row}
      card={card}
      itemActions={itemActions}
      hasDelete={hasDelete}
      hasEdit={hasEdit}
      edit={edit}
      hasItemSelection={true}
    />
    {
      create
        ?
        create()
        :
        null
    }
  </ListContext.Provider>
};

export { List };
export { Text } from './Filters/Text';
export { Enum } from './Filters/Enum';
export { Ascending } from './Sorts/Ascending';
export { ListAction } from './ListAction';
export { ItemAction } from './ItemAction';
export { Browse } from './Filters/Browse';
export { get, post } from '../../Base/Api';
export { ValueWithTitle } from '../Show/ValueWithTitle';
export { app } from '../../Base/App';
export { useQueryStringState } from '../../Base/UseQueryStringState';
export { useLocalStorageState } from '../../Base/UseLocalStorageState';

/*
List anatomy

  List
    ListActions
      ListAction
      ListAction
      ...
    Filtering
      Filter1
      Filter2
      ...
    Sorting
      Sort1
      Sort2
    Pagination
      GoToPage
      PageSize
      Page links
  Items (tabular, card)
    Item1
      ItemActions
        ItemAction1
        ItemAction2
        ...
    Item2
    ..
*/