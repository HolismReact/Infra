import React, { useContext } from 'react';
import Pagination from './Pagination';
import ItemActions from './ItemActionsHolder';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { ListContext, app } from '@List';

const Cards = ({
    data,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    entityType,
    create,
    upsert,
    metadata,
    card,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation,
    noItemIsFoundStyle
}) => {

    const listContext = useContext(ListContext);
    const { selectedItems } = listContext;

    return <>
        {
            data.length === 0
                ?
                <div className={noItemIsFoundStyle}>{app.t("No item is found")}</div>
                :
                <>
                    <Collapse in={showTopPagiation} className="w-full">
                        <div className="px-6 w-full">
                            <Pagination metadata={metadata} />
                        </div>
                        <br />
                    </Collapse>
                    {

                        hasItemSelection ?
                            <div className="w-full flex justify-start px-6">
                                <Tooltip
                                    title="Select all"
                                    placement="top"
                                >
                                    <Checkbox
                                        color="primary"
                                        onChange={(event) => {
                                            event.target.checked
                                                ?
                                                app.addItemsToSelectedItems(listContext, data)
                                                :
                                                app.removeItemsFromSelectedItems(listContext, data)
                                        }}
                                        inputProps={{ 'aria-label': 'Select all' }}
                                    />
                                </Tooltip>
                            </div>
                            :
                            null
                    }
                    <br />
                    {
                        data.map((item, index) =>
                            <div
                                className=
                                {
                                    'item w-full py-4 px-6 overflow-hidden ' +
                                    (index === 0 ? '' : 'border-t ') +
                                    (classProvider ? classProvider(item) : '')
                                }
                                key={item.id}
                                dir={app.isRtl() ? "rtl" : "ltr"}
                            >
                                {
                                    hasItemSelection
                                        ?
                                        <div className="flex flex-row">
                                            <div className="flex items-center justify-center w-10 mr-4">
                                                <Checkbox
                                                    checked={selectedItems.indexOf(item.id) > -1}
                                                    color="primary"
                                                    onChange={(event) => {
                                                        event.target.checked
                                                            ?
                                                            app.addItemToSelectedItems(listContext, item.id)
                                                            :
                                                            app.removeItemFromSelectedItems(listContext, item.id)
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                {
                                                    card(item)
                                                }
                                            </div>
                                        </div>
                                        :
                                        card(item)
                                }
                                {
                                    (itemActions || hasDelete || hasEdit || edit)
                                        ?
                                        <div className="flex flex-wrap items-center justify-end">
                                            <ItemActions
                                                entityType={entityType}
                                                item={item}
                                                itemActions={itemActions}
                                                hasDelete={hasDelete}
                                                hasEdit={hasEdit}
                                                editionComponent={edit}
                                                creationComponent={create}
                                                setItem={setItem}
                                                reload={reload}
                                            />
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    }
                    < br />
                    <div className="px-6 w-full">
                        <Pagination metadata={metadata} />
                    </div>
                </>
        }
    </>
}

export default Cards;