import React from 'react';
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const useQueryStringState = (key, defaultValue) => {
    let query = useQuery();

    const [value, setValue] = React.useState(() => {
        const queryStringValue = query.get(key);
        return (queryStringValue !== null && queryStringValue !== 'undefined')
            ? queryStringValue
            : defaultValue;
    });
    React.useEffect(() => {
        query.set(key, value);
    }, [key, value]);
    return [value, setValue];
}

export default useQueryStringState;
export { useQueryStringState };