import React, { useState, useEffect } from 'react';
import Filtering from "./Filtering";
import CreateListParameters from "../../Base/CreateListParameters";
import Sorting from "./Sorting";
import Items from "./Items";
import ListActions from "./ListActions";
import Holism from '../../Base/Holism';
import KeycloakClient from '../../Accounts/KeycloakClient';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from './Filters/Filter';
import CachedIcon from '@material-ui/icons/Cached';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

export const ListContext = React.createContext({
  isCreationDialogOpen: false,
  setIsCreationDialogOpen: () => { },
  listParameters: {},
  reloadItems: () => { }
});

const List = ({ title, subtitle, breadcrumbItems, filters, listActions, sorts, entity, headers, row, card, create, itemActions, hasDelete, hasEdit, edit }) => {
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [listParameters, setListParameters] = useState(CreateListParameters(KeycloakClient.keycloak.subject, entity));
  const [isFilteringOpen, setIsFilteringOpen] = useState();

  useEffect(() => {
    Holism.emit(Holism.componentLoaded, {
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
    reloadItems: () => { }
  }} id='list'>

    {
      isFilteringOpen
        ?
        <Filtering filters={filters} />
        :
        null
    }

    <div className='flex items-center justify-between px-6 py-2'>
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
            onClick={() => Holism.emit(Holism.reloadRequirement)}
            className={listActionIconStyle}
          >
            <CachedIcon />
          </span>
        }
      </div>
    </div>

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
