import React, { useState, useEffet } from 'react';
import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Items from "../List/Items";
import CreateListParameters from '../../Base/CreateListParameters';
import FilterListIcon from '@material-ui/icons/FilterList';
import CachedIcon from '@material-ui/icons/Cached';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import { ItemAction, ListContext } from '../List/List';
import CheckIcon from '@material-ui/icons/Check';
import Collapse from '@material-ui/core/Collapse';
import app from '../../Base/App';

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

const Browse = ({ sorts, filters, row, card, entity, headers, callerId }) => {

    const [listParameters, setListParameters] = useState(CreateListParameters(app.userGuid(), entity));
    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entity}_isFilteringOpen`);

    const toggleFiltering = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }

    const itemActions = <>
        <ItemAction
            icon={<CheckIcon />}
            title={'Select ' + entity}
            click={(item) => {
                app.emit(app.entitySelected, { item, callerId });
            }}
        />
    </>

    return <ListContext.Provider value={{
        listParameters: listParameters,
    }} id='list'>
        <div className='flex items-center justify-end px-6 py-2'>
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
                        onClick={() => app.emit(app.reloadRequested)}
                        className={listActionIconStyle}
                    >
                        <CachedIcon />
                    </span>
                }
            </div>
        </div>

        <Collapse in={isFilteringOpen}>
            <div className='mb-4'>
                <Filtering filters={filters} />
            </div>
        </Collapse>

        <Items
            entity={entity}
            headers={headers}
            row={row}
            card={card}
            itemActions={itemActions}
        />
    </ListContext.Provider>
}

export { Browse };
export { Text } from '../List/Filters/Text';
export { Enum } from '../List/Filters/Enum';
export { Ascending } from '../List/Sorts/Ascending';