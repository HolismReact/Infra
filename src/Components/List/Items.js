import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../Base/Api';
import Holism from '../../Base/Holism';
import { ListContext } from './List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from './Pagination';
import { ItemAction } from './ItemAction';
import DeleteAction from './DeleteAction';

const table = ({ entity, data, metadata, headers, row, itemActions, hasDelete }) => {

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
                            <td colSpan='100' className='py-10 text-2xl font-bold text-gray-600'>No item is found</td>
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
                                (itemActions || hasDelete)
                                    ?
                                    <td>
                                        {
                                            itemActions
                                        }
                                        {
                                            <DeleteAction entity={entity} item={item} />
                                        }
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

const Items = ({ entity, card, headers, row, hasDelete }) => {
    const [loading, setLoading] = useState();
    const [reloadedTimes, setReloadedTimes] = useState(0);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState({});
    const { listParameters, reloadItems } = useContext(ListContext);

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
            const { data, ...metadata } = result;
            setData(data);
            setMetadata(metadata);
            setLoading(false);
            console.log(listParameters);
        }, (error) => {
            //error(error);
            console.error(error);
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

    return <div id='items' className='bg-white p-6 rounded-lg flex items-center justify-center '>
        {
            loading
                ?
                <CircularProgress />
                :
                (
                    card
                        ?
                        data.map(item => <div className='item' key={item.id}>
                            {card({ entity, item, hasDelete })}
                            <Pagination metadata={metadata} />
                        </div>)
                        :
                        table({ entity, loading, data, metadata, headers, row, hasDelete })
                )
        }
    </div>
}

export default Items;