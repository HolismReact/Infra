import React, { useState, useEffect } from 'react';
import Holism from '../Base/Holism';

const Footer = () => {

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const hide = () => {
            setIsShown(false);
        };
        Holism.on(Holism.makeRoom, hide);
        return () => {
            Holism.removeListener(Holism.makeRoom, hide);
        };
    });

    useEffect(() => {
        const show = () => {
            setIsShown(true);
        };
        Holism.on(Holism.returnBackToNormalForm, show);
        return () => {
            Holism.removeListener(Holism.returnBackToNormalForm, show);
        };
    });

    return <div id='footer' className={"h-10 flex items-center justify-center text-sm font-semibold text-gray-700" + (isShown ? "" : " hidden")}>
        Copyright @ 2021
    </div>
};

export default Footer;