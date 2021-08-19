import { useState } from 'react';
import Holism from '../Base/Holism';
import MessageIcon from '@material-ui/icons/Message';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ onMenuIconClicked }) => {

    const [isOpen, setIsOpen] = useState();

    const toggleHeader = () => {
        setIsOpen(!isOpen);
    }

    const items = [
        {
            name: "closeHeader",
            icon: <ExpandLessIcon />

        },
        {
            name: "maximize",
            icon:
                <>
                    <span><FullscreenIcon /></span>
                    <span><FullscreenExitIcon /></span>
                </>,
            onClick: () => {
                if (document.fullscreenEnabled) {
                    if (document.webkitIsFullScreen) {
                        document.exitFullscreen();
                    } else {
                        document.documentElement.requestFullscreen();
                    }
                } else {
                    Holism.warning("Your browser does not support fullscreen.");
                }
            }
        },
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

    return <div id='header' className={"flex items-center p-10 justify-between " + (isOpen ? "h-20" : "h-0")} >
        <div>
            <div className='bg-white rounded-md p-1.5 px-2.5 text-gray-600 cursor-pointer' onClick={onMenuIconClicked}>
                <MenuIcon />
            </div>
        </div>
        <div className='flex items-center justify-center'>
            {
                items.map((item, index) => <div onClick={item.onClick || (() => { })} key={item.name} className={(index === 0 ? "" : "ml-6 ") + 'text-gray-600 cursor-pointer hover:text-blue-500'}>
                    {item.icon}
                </div>)
            }
        </div>
    </div>
};

export default Header;