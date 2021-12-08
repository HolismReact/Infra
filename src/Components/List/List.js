import React, { useState, useEffect } from 'react';
import Filtering from "./Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./Sorting";
import Items from "./Items";
import ListActions from "./ListActions";
import app from '../../Base/App';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './Filters/Filter';
import CachedIcon from '@mui/icons-material/Cached';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import Collapse from '@mui/material/Collapse';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Tooltip from '@mui/material/Tooltip';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

export const ListContext = React.createContext({
  isCreationDialogOpen: false,
  setIsCreationDialogOpen: () => { },
  listParameters: {},
  selectedItems: [],
  setSelectedItems: () => { }
});

const List = ({
  title,
  subtitle,
  breadcrumbItems,
  filters,
  listActions,
  sorts,
  entity,
  headers,
  row,
  card,
  create,
  itemActions,
  hasDelete,
  hasEdit,
  edit,
  creationButton,
  classProvider
}) => {
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters(app.userGuid(), entity));
  const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entity}_isFilteringOpen`);
  const [selectedItems, setSelectedItems] = useState([]);

  const hasItemSelection = listActions ? true : false;

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
    setSelectedItems: setSelectedItems
  }} id='list'>

    <div
      className={
        'lg:flex items-center justify-between px-6 py-2 lg:h-14'
        + (app.isRtl() ? " lg:flex-row-reverse " : "")
      }
    >
      <ListActions
        actions={listActions}
        create={create}
        creationButton={creationButton}
      />
      <div
        className={
          "sortAndFilteringAndReload flex items-center justify-end my-4 lg:my-0"
          + (app.isRtl() ? " flex-row-reverse " : "")
        }
      >
        {
          <span
            id='showHideTopPagination'
            className={
              listActionIconStyle
              + (app.isRtl() ? " ml-2 " : " mr-2 ")
            }
            onClick={() => app.emit(app.toggleTopPagination)}
          >
            <SwapHorizIcon />
          </span>
        }
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
              className={
                listActionIconStyle
                + (app.isRtl() ? " ml-2 " : " mr-2 ")
              }
              onClick={toggleFiltering}
            >
              <Tooltip title={app.t('Filters')}>
                <FilterListIcon />
              </Tooltip>
            </span>
            :
            null
        }
        {
          <span
            id='reload'
            onClick={() => app.emit(app.reloadRequested)}
            className={listActionIconStyle}
          >
            <Tooltip title={app.t('Reload')}>
              <CachedIcon />
            </Tooltip>
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
      hasItemSelection={hasItemSelection}
      classProvider={classProvider}
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
export { BooleanProperty } from './Properties/Boolean';
export { Color } from './Properties/Color';
export { Chip } from './Properties/Chip';
export { Progress } from '../Progress';

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