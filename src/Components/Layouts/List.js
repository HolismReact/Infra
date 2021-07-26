import { get } from "../../Base/Api";
import { useEffect, useState } from 'react';

const List = (props) => {

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        get(`${props.entity}/list`).then((data) => {
            setData(data.data);
            setLoading(false);
        }, (error) => {
            //error(error);
            console.error(error);
            setLoading(false);
        });
    }, []);

    return <>
        {
            loading
                ?
                <div>loading...</div>
                :
                <>
                    <div>{props.title}</div>
                    <div>{props.filters}</div>
                    <div>{props.sorts}</div>
                    <div>{props.listActions}</div>
                    <div>
                        {data.map(item => <div>{item.id}</div>)}
                    </div>
                </>
        }
    </>
};

export default List;