import React, { useState, useEffect } from 'react';
import Holism from '../Base/Holism';
import MessageIcon from '@material-ui/icons/Message';
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
// import HeaderActions from '../HeaderActions.js'
import { FullScreen } from './HeaderActions/FullScreen';
import { Maximize } from './HeaderActions/Maximize';

const Header = ({ onMenuIconClicked }) => {

    const [isShown, setIsShown] = useState(true);

    const items = [
        {
            name: "apps",
            icon: <AppsIcon />
        },
        {
            name: "messages",
            icon: <MessageIcon />
        },
        {
            name: "notification",
            icon: <NotificationsIcon />
        },
    ]

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
        <div id='header' className={"flex items-center p-10 justify-between " + (true ? "h-20" : "h-0") + (isShown ? " " : " hidden")} >
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
                    // <HeaderActions />
                    <>
                        <Maximize />
                        <FullScreen />
                    </>
                }
            </div>
        </div>
        <div className={"m-auto absolute top-0 right-0 left-0 h-0 flex justify-center " + (isShown ? " hidden" : "")} onClick={() => Holism.emit(Holism.returnBackToNormalForm)}>
            <ExpandMoreIcon style={{ fontSize: 40 }} className="cursor-pointer" />
        </div>
    </>
};

export default Header;