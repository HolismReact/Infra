import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ListContext, useLocalStorageState, app, get } from '@List';
import Cards from './ItemsCards'
import Table from './ItemsTable'

const noItemIsFoundStyle = 'py-10 text-2xl font-bold text-gray-600';

const Items = (props) => {

    const { entityType, card, headers, row, classProvider } = props;
    app.ensure([entityType]);

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const { listParameters } = useContext(ListContext);
    const [showTopPagiation, setTopPaginationVisibility] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isTopPaginationShown`);

    useEffect(() => {
        const setVisibility = () => {
            setTopPaginationVisibility(!showTopPagiation);
        };
        app.on(app.toggleTopPagination, setVisibility);
        return () => {
            app.removeListener(app.toggleTopPagination, setVisibility);
        }
    });

    const setEntityProgress = (entity, progress) => {
        setData((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === entity.id) {
                    data[i].progress = progress;
                }
            }
            return [...data];
        });
    }

    useEffect(() => {
        const onEntityReloadRequested = ({ entity }) => {
            setEntityProgress(entity, true);
            get(`${entityType}/get/${entity.id}`)
                .then(result => {
                    setEntityProgress(entity, false)
                    setItem(result)
                }, error => {
                    setEntityProgress(entity, false)
                    app.error(error)
                })
        }
        app.on(app.entityReloadRequested, onEntityReloadRequested)
        return () => {
            app.removeListener(app.entityReloadRequested, onEntityReloadRequested)
        }
    }, [entityType])

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

    if (classProvider && typeof classProvider !== 'function') {
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
        let url = `${entityType}/list?pageNumber=${listParameters.pageNumber}&pageSize=${listParameters.pageSize}`;
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
        'bg-white dark:bg-zinc-700 transition-colors py-6 md:rounded-lg flex flex-col items-center justify-center '
        +
        (
            card
                ?
                " flex-col"
                :
                ""
        )
    }
        style={{
            maxWidth: '100vw'
        }}
    >
        {
            loading
                ?
                <CircularProgress
                    className="my-12"
                />
                :
                (
                    card
                        ?
                        <Cards {...props}
                            noItemIsFoundStyle={noItemIsFoundStyle}
                            loading={loading}
                            data={data}
                            metadata={metadata}
                            setItem={setItem}
                            reload={reload}
                            showTopPagiation={showTopPagiation}

                        />
                        :
                        <Table {...props}
                            noItemIsFoundStyle={noItemIsFoundStyle}
                            loading={loading}
                            data={data}
                            metadata={metadata}
                            setItem={setItem}
                            reload={reload}
                            showTopPagiation={showTopPagiation}
                        />
                )
        }
    </div>
}

export default Items;