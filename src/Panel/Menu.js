import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import menuItems from '../Menu.js'
import Down from '../Components/Icons/Down.js';
import { useLocation } from "react-router-dom";

const liStyle = "py-2 hover:bg-gray-50 cursor-pointer text-sm tracking-wide text-gray-600 hover:text-gray-800 font-normal relative"
const iconStyle = "text-gray-600 hover:text-gray-900 mr-3"

const MenuItemWithSubmenu = ({ item, onClick }) => {
    let location = useLocation();

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(() => {
        var isOpen = item.children.filter(i => i.url === location.pathname).length > 0;
        return isOpen;
    });
    const openSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };
    return (
        <Fragment key={item.title}>
            {/* <li className="navigation-divider">{item.title}</li> */}
            <div
                className={liStyle + (
                    isSubmenuOpen
                        ?
                        " pb-0"
                        :
                        ""
                )}
                onClick={openSubmenu}
            >
                <span className="px-9 flex items-center h-full">
                    <span className="flex items-center mr-3"><item.iconSvg /></span>
                    <span>{item.title}</span>
                    <span className="flex-1 flex flex-row-reverse"><Down size="4" /></span>
                </span>
                <div className={(isSubmenuOpen ? " pt-2" : "hidden")}>
                    {
                        item.children.map((child, index) => {
                            return <Link
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                                to={child.url}
                                key={index}
                                className={liStyle + " flex items-center hover:bg-gray-100" + (child.url === location.pathname ? " bg-gray-200 text-blue-800 hover:text-blue-800" : '')}
                            >
                                {
                                    child.url === location.pathname
                                        ?
                                        <span className="w-2 bg-blue-600 h-full absolute rounded-tr-md rounded-br-md"></span>
                                        :
                                        null
                                }
                                <span className={"ml-20"}>{child.title}</span>
                            </Link>
                        })
                    }
                </div>
            </div>

        </Fragment>
    );
};

const Menu = ({ onClick }) => {
    return <div id="menu" className="mt-5">
        {
            menuItems.map((item, index) => {
                if (item.children && item.children.length > 0) {
                    return <MenuItemWithSubmenu key={index} item={item} onClick={onClick} />
                }
                else {
                    if (!item.children && !item.url) {
                        throw new Error(`Holism way of defining submenu items is via 'children' property. Please either provide a 'url' property for top-level menu items, or specify their 'children' in ${JSON.stringify(item)}.`);
                    }
                    if (item.children && item.children.length === 0) {
                        throw new Error('Please remove menu items with zero childrens. Empty children array is not valid.')
                    }
                    return (<Fragment key={index}>
                        <Link onClick={onClick} to={item.url} className={liStyle + " flex items-center"}>
                            <span className="px-9 flex items-cener">
                                <span className={iconStyle}>
                                    <item.iconSvg />
                                </span>
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    </Fragment>)
                }
            })
        }
    </div>
}

export default Menu;