import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../Base/Api';
import { ListContext } from './List';

const table = ({ data, headers, row }) => {
    let headerElements = React.Children.toArray(headers).map(header => React.cloneElement(header, { className: "text-red-500" }));
    console.log(headerElements);

    return <table className="w-full text-center">
        <thead>
            <tr className='text-xs uppercase text-gray-900 font-light tracking-wider border-b-2'>
                {
                    headerElements
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map(item => <tr key={item.id} className='py-3'>
                    {row(item)}
                </tr>)
            }
        </tbody>
    </table>
};

const Items = ({ entity, card, headers, row }) => {
    const [loading, setLoading] = useState();
    const [reloadedTimes, setReloadedTimes] = useState(0);
    const [data, setData] = useState([]);
    const { listParameters, reloadItems } = useContext(ListContext);

    const load = () => {
        setLoading(true);
        get(`${entity}/list?filters=${listParameters.filtersQueryString()}`).then((data) => {
            setData(data.data);
            setLoading(false);
            console.log(listParameters);
        }, (error) => {
            //error(error);
            console.error(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        load();
    }, [reloadedTimes]);

    return <div id='items' className=''>
        {
            loading
                ?
                <div>loading...</div>
                :
                (
                    card
                        ?
                        data.map(item => <div className='item' key={item.id}>
                            {card(item)}
                        </div>)
                        :
                        table({ loading, data, headers, row })
                )
        }
    </div>
}

export default Items;