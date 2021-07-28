import { useState, useEffect, useContext } from 'react';
import { get } from '../../../Base/Api';
import { ListContext } from '../List';

const Items = (props) => {
    const [loading, setLoading] = useState();
    const [reloadedTimes, setReloadedTimes] = useState(0);
    const [data, setData] = useState([]);
    const { listParameters, reloadItems } = useContext(ListContext);

    const load = () => {
        setLoading(true);
        get(`${props.entity}/list?filters=${listParameters.filtersQueryString()}`).then((data) => {
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

    return <div id='items' className='bg-red-200 m-2 p-2'>items</div>
}

export default Items;