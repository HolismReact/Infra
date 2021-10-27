import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        //console.log(size);
    }, [size]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Section = ({
    children
}) => {

    const ref = useRef(null);
    const [windowWidth, windowHeight] = useWindowSize();
    const [count] = useState(children.length);
    const [width, setWidth] = useState(null);

    const clonedChildren = React.Children
        .toArray(children)
        .map(child => React.cloneElement(child, {
            allSiblingsCount: count,
        }));

    let widgetWidth = "";
    if (count === 4) {
        widgetWidth = "23%";
    }
    else if (count === 3) {
        widgetWidth = "32%";
    }
    else if (count === 2) {
        widgetWidth = "48.5%";
    }
    else if (count === 1) {
        widgetWidth = "w-full";
    }
    else {
        throw new Error('Dashboard widgets are only supported in 1,2,3, and 4 widgets per section.');
    }

    useEffect(() => {
    }, [ref]);

    return <div
        className={
            "section flex flex-row justify-between w-full mb-6 "
            + `windowWidth_${windowHeight}`
        }
        ref={ref}
    >
        {
            clonedChildren.map((clonedChild, index) => {
                return <div
                    key={index}
                    className={
                        "widgetWrapper"
                    }
                    style={{
                        width: widgetWidth
                    }}
                >
                    {clonedChild}
                </div>
            })
        }
    </div>
}

export { Section };