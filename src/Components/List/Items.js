import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../Base/Api';
import Holism from '../../Base/Holism';
import { ListContext } from './List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from './Pagination';
import ItemActions from './ItemActions';

const noItemIsFoundStyle = 'py-10 text-2xl font-bold text-gray-600';

const cards = ({ data, itemActions, hasDelete, hasEdit, edit, entity, create, metadata, card }) => {
    return <>
        {
            data.length === 0
                ?
                <div className={noItemIsFoundStyle}>No item is found</div>
                :
                <>
                    {
                        data.map((item, index) =>
                            <div
                                className={'item w-full py-4 ' + (index === 0 ? '' : 'border-t')}
                                key={item.id}>
                                {card(item)}
                                {
                                    (itemActions || hasDelete || hasEdit || edit)
                                        ?
                                        <td className="flex items-center justify-end">
                                            <ItemActions
                                                entity={entity}
                                                item={item}
                                                itemActions={itemActions}
                                                hasDelete={hasDelete}
                                                hasEdit={hasEdit}
                                                editionComponent={edit}
                                                creationComponent={create}
                                            />
                                        </td>
                                        :
                                        null
                                }
                            </div>
                        )
                    }
                    < br />
                    <Pagination metadata={metadata} />
                </>
        }
    </>
}

const table = ({ entity, data, metadata, headers, row, itemActions, hasDelete, hasEdit, edit, create }) => {

    let headerElements = [];

    if (headers) {

        headerElements = React.Children
            .toArray(headers.props.children)
            .map(header => React.cloneElement(header, {
                className: "text-gray-900 py-3 font-light text-xs"
            }));
    }

    return <table className="w-full text-center">
        <thead>
            <tr className='text-xs uppercase text-gray-900 font-light tracking-wider border-b'>
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
                            <td colSpan='100' className={noItemIsFoundStyle}>No item is found</td>
                        </tr>
                        :
                        data.map((item, index) => <tr
                            key={item.id}
                            className={'py-3 ' + ((index === data.length - 1) ? '' : 'border-b')}
                        >
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
                                    <td className="flex items-center justify-end">
                                        <ItemActions
                                            entity={entity}
                                            item={item}
                                            itemActions={itemActions}
                                            hasDelete={hasDelete}
                                            hasEdit={hasEdit}
                                            editionComponent={edit}
                                            creationComponent={create}
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
        {
            data.length === 0
                ?
                null
                :
                <tfoot>
                    <tr>
                        <td colSpan='100' className="pt-8">
                            <Pagination metadata={metadata} />
                        </td>
                    </tr>
                </tfoot>
        }
    </table>
};

const Items = ({ entity, card, headers, row, hasDelete, hasEdit, edit, create, itemActions }) => {
    const [loading, setLoading] = useState();
    const [reloadedTimes, setReloadedTimes] = useState(0);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const { listParameters } = useContext(ListContext);

    const load = () => {
        listParameters.storeInLocalStorage();
        setLoading(true);
        let url = `${entity}/list?pageNumber=${listParameters.pageNumber}&pageSize=${listParameters.pageSize}`;
        const filters = listParameters.filtersQueryString();
        if (filters) {
            url += `${url}&filters=${filters}`;
        }
        const sorts = listParameters.sortsQueryString();
        if (sorts) {
            url += `${url}&sorts=${sorts}`;
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
            Holism.error(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        Holism.on(Holism.itemCreated, load);
        return () => {
            Holism.removeListener(Holism.itemCreated, load);
        }
    }, []);

    useEffect(() => {
        Holism.on(Holism.reloadRequirement, load);
        return () => {
            Holism.removeListener(Holism.reloadRequirement, load);
        }
    }, [])

    useEffect(() => {
        load();
    }, []);

    return <div id='items' className={
        'bg-white p-6 rounded-lg flex items-center justify-center '
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
                        cards({ entity, loading, data, metadata, card, itemActions, hasDelete, hasEdit, edit, create })
                        :
                        table({ entity, loading, data, metadata, headers, row, itemActions, hasDelete, hasEdit, edit, create })
                )
        }
    </div>
}

export default Items;