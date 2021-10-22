import React, { useState, useEffect } from 'react';
import app from '../Base/App';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderActions from '../HeaderActions.js'
import { FullScreen } from './HeaderActions/FullScreen';
import { Maximize } from './HeaderActions/Maximize';
import Collapse from '@material-ui/core/Collapse';

const Header = ({ onMenuIconClicked }) => {

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const hide = () => {
            setIsShown(false);
        };
        app.on(app.makeRoom, hide);
        return () => {
            app.removeListener(app.makeRoom, hide);
        };
    });

    useEffect(() => {
        const show = () => {
            setIsShown(true);
        };
        app.on(app.returnBackToNormalForm, show);
        return () => {
            app.removeListener(app.returnBackToNormalForm, show);
        };
    });

    return <>
        <Collapse in={isShown}>
            <div
                id='header'
                className={
                    "flex items-center p-10 justify-between h-20"
                    + (app.isRtl() ? " flex-row-reverse " : "")
                }
            >
                <div>
                    <div className='bg-white rounded-md p-1.5 px-2.5 text-gray-600 cursor-pointer' onClick={onMenuIconClicked}>
                        <MenuIcon />
                    </div>
                </div>
                <div
                    className={
                        'flex items-center justify-center'
                        + (app.isRtl() ? " flex-row-reverse " : "")
                    }
                >
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
                className="m-auto absolute top-0 right-0 left-0 h-0 flex justify-center" onClick={() => app.emit(app.returnBackToNormalForm)}>
                <ExpandMoreIcon style={{ fontSize: 40 }} className="cursor-pointer" />
            </div>
        </Collapse>
    </>
};

export default Header;