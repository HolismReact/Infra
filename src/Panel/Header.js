import { useState } from 'react';
import Holism from '../Base/Holism';

const menuSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>

const upSvg = <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="h-6 w-6"
    viewBox="0 0 24 24"
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
    ></path>
</svg>

const Header = ({ onMenuIconClicked }) => {

    const [isOpen, setIsOpen] = useState();

    const toggleHeader = () => {
        setIsOpen(!isOpen);
    }

    const icons = [
        {
            name: "closeHeader",
            svgContent: upSvg

        },
        {
            name: "maximize",
            svgContent:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />,
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
            svgContent:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        },
        {
            name: "messages",
            svgContent:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        },
        {
            name: "notification",
            svgContent:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        },
    ]

    return <div id='header' className={"flex items-center p-10 justify-between " + (isOpen ? "h-20" : "h-0")} >
        <div>
            <div className='bg-white rounded-md p-1.5 px-2.5 text-gray-600 cursor-pointer' onClick={onMenuIconClicked}>
                {menuSvg}
            </div>
        </div>
        <div className='flex items-center justify-center'>
            {
                icons.map((icon, index) => <div onClick={icon.onClick || (() => { })} key={icon.name} className={(index === 0 ? "" : "ml-6 ") + 'text-gray-600 cursor-pointer hover:text-blue-500'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icon.svgContent}
                    </svg>
                </div>)
            }
        </div>
    </div>
};

export default Header;