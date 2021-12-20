import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../Base/Api';
import app from '../../Base/App';
import { ListContext, useLocalStorageState } from './List';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from './Pagination';
import ItemActions from './ItemActionsHolder';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';

const noItemIsFoundStyle = 'py-10 text-2xl font-bold text-gray-600';

const Cards = ({
    data,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    entity,
    create,
    metadata,
    card,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation
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
                                    classProvider(item)
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
                                                entity={entity}
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

const Table = ({
    entity,
    data,
    metadata,
    headers,
    row,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation
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
                                        classProvider(item)
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
                                                    entity={entity}
                                                    item={item}
                                                    itemActions={itemActions}
                                                    hasDelete={hasDelete}
                                                    hasEdit={hasEdit}
                                                    editionComponent={edit}
                                                    creationComponent={create}
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

const Items = ({
    entity,
    card,
    headers,
    row,
    hasDelete,
    hasEdit,
    edit,
    create,
    itemActions,
    hasItemSelection,
    classProvider
}) => {

    app.ensure([entity]);

    const [loading, setLoading] = useState();
    const [reloadedTimes, setReloadedTimes] = useState(0);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const { listParameters } = useContext(ListContext);
    const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entity}_isTopPaginationShown`);

    useEffect(() => {
        const setVisibility = () => {
            setTopPaginationVisibility(!showTopPagiation);
        };
        app.on(app.toggleTopPagination, setVisibility);
        return () => {
            app.removeListener(app.toggleTopPagination, setVisibility);
        }
    });

    const setItem = (item) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === item.id) {
                    data[i] = item;
                }
            }
            return [...data];
        });
    }

    const reload = (item) => {
        load();
    }

    if (!classProvider) {
        classProvider = () => '';
    }
    if (typeof classProvider !== 'function') {
        console.warn('classProvider should be a function');
    }

    if (!row && !card) {
        throw new Error('You should either provide a row or a card component');
    }

    if (row && !headers) {
        throw new Error('When you provide row, you should also provide headers component');
    }

    const load = () => {
        listParameters.storeInLocalStorage();
        setLoading(true);
        let url = `${entity}/list?pageNumber=${listParameters.pageNumber}&pageSize=${listParameters.pageSize}`;
        const filters = listParameters.filtersQueryString();
        if (filters) {
            url += `&filters=${filters}`;
        }
        const sorts = listParameters.sortsQueryString();
        if (sorts) {
            url += `&sorts=${sorts}`;
        }
        if (window.location.search) {
            const query = window.location.search.slice(1);
            url += `&${query}`;
        }
        get(url).then((result) => {
            if (!result) {
                return;
            }
            const { data, ...metadata } = result;
            setData(data);
            setMetadata(metadata);
            setLoading(false);
            console.log(listParameters);
        }, (error) => {
            app.error(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        app.on(app.itemCreated, load);
        return () => {
            app.removeListener(app.itemCreated, load);
        }
    }, []);

    useEffect(() => {
        app.on(app.reloadRequested, load);
        return () => {
            app.removeListener(app.reloadRequested, load);
        }
    }, [])

    useEffect(() => {
        load();
    }, []);

    return <div id='items' className={
        'bg-white py-6 md:rounded-lg flex flex-col items-center justify-center '
        +
        (
            card
                ?
                " flex-col"
                :
                ""
        )
    }>
        {
            loading
                ?
                <CircularProgress />
                :
                (
                    card
                        ?
                        Cards({
                            entity,
                            loading,
                            data,
                            metadata,
                            card,
                            itemActions,
                            hasDelete,
                            hasEdit,
                            edit,
                            create,
                            setItem,
                            reload,
                            hasItemSelection,
                            classProvider,
                            showTopPagiation
                        })
                        :
                        // window.innerWidth < app.breakpoints.md
                        //     ?
                        //     <div>Only Cards are shown for small screens!</div>
                        //     :
                        Table({
                            entity,
                            loading,
                            data,
                            metadata,
                            headers,
                            row,
                            itemActions,
                            hasDelete,
                            hasEdit,
                            edit,
                            create,
                            setItem,
                            reload,
                            hasItemSelection,
                            classProvider,
                            showTopPagiation
                        })
                )
        }
    </div>
}

export default Items;