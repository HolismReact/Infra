import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import menuItems from '../Menu.js'
import Down from '../Components/Icons/Down.js';

const liStyle = "h-10 hover:bg-gray-50 cursor-pointer text-sm tracking-wide text-gray-600 hover:text-gray-800 font-normal"
const iconStyle = "text-gray-600 hover:text-gray-900 mr-3"
const openCloseStyle = "";
const selectedStyle = "";

const Menu = () => {
    return <div className="mt-5">
        {
            menuItems.map((item) => {
                if (item.children && item.children.length > 0) {
                    const [isSubmenuOpen, setIsSubmenuOpen] = useState();
                    const openSubmenu = () => {
                        setIsSubmenuOpen(!isSubmenuOpen);
                    };
                    return (
                        <Fragment key={item.title}>
                            {/* <li className="navigation-divider">{item.title}</li> */}
                            <div
                                className={liStyle}
                                onClick={openSubmenu}
                            >
                                <span className="px-9 flex items-center h-full">
                                    <span class="flex items-center mr-3"><item.iconSvg /></span>
                                    <span>{item.title}</span>
                                    <span className="flex-1 flex flex-row-reverse"><Down size="4" /></span>
                                </span>
                                <div className={(isSubmenuOpen ? "" : "hidden")}>
                                    {
                                        item.children.map((child) => {
                                            return <Link
                                                to={child.url}
                                                key={child.url}
                                                className={liStyle + " flex items-center"}
                                            >
                                                <span className={"ml-20"}>{child.title}</span>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>

                        </Fragment>
                    );
                }
                else {
                    if (!item.children && !item.url) {
                        throw new Error(`Holism way of defining submenu items is via 'children' property. Please either provide a 'url' property for top-level menu items, or specify their 'children' in ${JSON.stringify(item)}.`);
                    }
                    if (item.children && item.children.length === 0) {
                        throw new Error('Please remove menu items with zero childrens. Empty children array is not valid.')
                    }
                    return (<Fragment key={item.title}>
                        <Link to={item.url}  className={liStyle + " flex items-center"}>
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