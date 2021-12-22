import React, { useContext } from 'react';
import Pagination from './Pagination';
import ItemActions from './ItemActionsHolder';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { ListContext, app } from '@List';

const Table = ({
    entityType,
    data,
    metadata,
    headers,
    row,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    upsert,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation,
    noItemIsFoundStyle
}) => {

    const listContext = useContext(ListContext);
    const { selectedItems } = listContext;

    let headerElements = [];

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .map(header => React.cloneElement(header, {
                className: "text-gray-900 py-3 font-light text-xs",
                children: React.Children.toArray(header.props.children).map(child => {
                    return typeof child === "string" ? app.t(child) : child;
                })
            }));
    }

    return <>
        {
            data.length === 0
                ?
                null
                :
                <Collapse in={showTopPagiation} className="w-full">
                    <div className="w-full px-6">
                        <Pagination metadata={metadata} />
                    </div>
                </Collapse>
        }
        <div className="w-full overflow-x-auto px-6">
            <table
                className="w-full text-center "
                style={{ minWidth: '600px' }}
                dir={app.isRtl() ? "rtl" : "ltr"}
            >
                <thead>
                    <tr className='text-xs uppercase text-gray-900 font-light tracking-wider border-b'>
                        {

                            hasItemSelection ?
                                <>
                                    <th>
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
                                    </th>
                                </>
                                :
                                null
                        }
                        {
                            headerElements
                        }
                        {
                            (itemActions || hasDelete)
                                ?
                                <td></td>
                                :
                                null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        row && typeof row === 'function'
                            ?
                            data.length === 0
                                ?
                                <tr>
                                    <td colSpan='100' className={noItemIsFoundStyle}>{app.t("No item is found")}</td>
                                </tr>
                                :
                                data.map((item, index) => <tr
                                    key={item.id}
                                    className=
                                    {
                                        'py-3 ' +
                                        ((index === data.length - 1) ? '' : 'border-b ') +
                                        (classProvider ? classProvider(item) : '')
                                    }
                                >
                                    {
                                        hasItemSelection
                                            ?
                                            <td>
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
                                            </td>
                                            :
                                            null
                                    }
                                    {
                                        React.Children
                                            .toArray(row(item).props.children)
                                            .map(itemElemen => React.cloneElement(itemElemen, {
                                                className: 'text-gray-900 py-3 text-sm font-light tracking-wide'
                                            }))
                                    }
                                    {
                                        (itemActions || hasDelete || hasEdit || edit)
                                            ?
                                            <td className="flex flex-wrap items-center justify-end">
                                                <ItemActions
                                                    entityType={entityType}
                                                    item={item}
                                                    itemActions={itemActions}
                                                    hasDelete={hasDelete}
                                                    hasEdit={hasEdit}
                                                    edit={edit}
                                                    create={create}
                                                    upsert={upsert}
                                                    setItem={setItem}
                                                    reload={reload}
                                                />
                                            </td>
                                            :
                                            null
                                    }
                                </tr>)
                            :
                            null
                    }
                </tbody>
            </table>
        </div>
        {
            data.length === 0
                ?
                null
                :
                <div className="pt-8 w-full px-6">
                    <Pagination metadata={metadata} />
                </div>
        }
    </>
};

export default Table;