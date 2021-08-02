import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Branding from './Branding.js';
import User from './User.js';
import menuItems from '../Menu.js'
import clsx from 'clsx';


export default function SidebarMenu() {
    const [OpenMenu, setOpenMenu] = useState('');
    const changeArrow = (open) => open ? 'openCloseWrap arrowDown' : 'openCloseWrap';
    return (
        <div className="navigation">
            <Branding />
            <User />
            <ul className="navSidebar">
                {
                    menuItems.map((item) => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <Fragment key={item.title}>
                                    {/* <li className="navigation-divider">{item.title}</li> */}
                                    <li className={clsx("list-item", {
                                        active: (OpenMenu === item.title)
                                    })}
                                        onClick={(e) => { OpenMenu === item.title ? setOpenMenu('') : setOpenMenu(item.title) }}
                                    >
                                        <button>
                                            <i className="fa fa-diamond nav-link-icon" aria-hidden="true"></i>

                                            <span>{item.title}</span>
                                            <span className={changeArrow(OpenMenu === item.title)} >
                                                <span className="openClose"></span>
                                            </span>
                                        </button>
                                        <ul className="submenu" >
                                            {
                                                item.children.map((child) => {
                                                    return <li key={child.url}>
                                                        <Link to={child.url} >{child.title}</Link></li>
                                                })
                                            }
                                        </ul>
                                    </li>

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
                                <li className="navigation-divider">{item.title}</li>
                                <li className="list-item">
                                    <Link to={item.url} >
                                        <i className="fa fa-diamond nav-link-icon" aria-hidden="true"></i>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            </Fragment>)
                        }
                    })
                }
            </ul>
        </div>
    );
}