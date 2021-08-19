import React, { useState, useEffect } from 'react';

const Footer = () => {

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const showHide = () => {
            setIsShown(false);
        };
        Holism.on(Holism.makeRoom, showHide);
        return () => {
            Holism.removeListener(Holism.makeRoom, showHide);
        };
    });

    return <div id='footer' className={"h-10 flex items-center justify-center text-sm font-semibold text-gray-700" + (isShown ? "" : " hidden")}>
        Copyright @ 2021
    </div>
};

export default Footer;