import React, { useState, useEffect } from 'react';
import Holism from '../Base/Holism';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderActions from './HeaderActions/HeaderAction.js'
import { FullScreen } from './HeaderActions/FullScreen';
import { Maximize } from './HeaderActions/Maximize';
import Collapse from '@material-ui/core/Collapse';

const Header = ({ onMenuIconClicked }) => {

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

    return <>
        <Collapse in={isShown}>
            <div id='header' className="flex items-center p-10 justify-between h-20" >
                <div>
                    <div className='bg-white rounded-md p-1.5 px-2.5 text-gray-600 cursor-pointer' onClick={onMenuIconClicked}>
                        <MenuIcon />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    {
                        // items.map((item, index) => <div onClick={item.onClick || (() => { })} key={item.name} className={(index === 0 ? "" : "ml-6 ") + 'text-gray-600 cursor-pointer hover:text-blue-500'}>
                        //     {item.icon}
                        // </div>)
                        <>
                            <Maximize />
                            <FullScreen />
                            <HeaderActions />
                        </>
                    }
                </div>
            </div>
        </Collapse>
        <Collapse in={!isShown}>
            <div
                className="m-auto absolute top-0 right-0 left-0 h-0 flex justify-center" onClick={() => Holism.emit(Holism.returnBackToNormalForm)}>
                <ExpandMoreIcon style={{ fontSize: 40 }} className="cursor-pointer" />
            </div>
        </Collapse>
    </>
};

export default Header;