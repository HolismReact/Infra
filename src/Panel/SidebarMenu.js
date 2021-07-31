import { Link } from 'react-router-dom';
import Branding from './Branding.js';
import User from './User.js';
import '../Style/Sidebar.css'
import menuItems from '../Menu.js'

export default function SidebarMenu() {

    function toggleSubmenu(event) {
        let e = event.target;
        let parentClass = "list-item"
        while (!e.classList.contains(parentClass)) {
            e = e.parentElement;
        }
        if (e.classList.contains("open"))
            e.classList.remove("open")
        else
            e.classList.add("open")
        return;
    }

    return (
        <div className="navigation">
            <Branding />
            <User />
            <div className="navigation-menu-body">
                <ul>
                    {
                        menuItems.map((item) => {
                            if (item.children && item.children.length > 0) {
                                return (
                                    <>
                                        <li className="navigation-divider">{item.title}</li>
                                        <li className="list-item" onClick={(e) => toggleSubmenu(e)}>
                                            <Link to={item.url} >
                                                <i className="fa fa-diamond icon" aria-hidden="true"></i>
                                                <span>{item.title}</span>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </Link>
                                            <ul className="submenu">
                                                {
                                                    item.children.map((child) => {
                                                        return <li> <Link to={child.url} >{child.title}</Link></li>
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    </>);
                            }
                            else {
                                if (!item.children && !item.url) {
                                    throw new Error(`Holism way of defining submenu items is via 'children' property. Please either provide a 'url' property for top-level menu items, or specify their 'children' in ${JSON.stringify(item)}.`);
                                }
                                if (item.children && item.children.length === 0) {
                                    throw new Error('Please remove menu items with zero childrens. Empty children array is not valid.')
                                }
                                return (
                                    <>
                                        <li className="navigation-divider">{item.title}</li>
                                        <li className="list-item">
                                            <Link to={item.url} >
                                                <i className="fa fa-diamond icon" aria-hidden="true"></i>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    </>)
                            }
                        })
                    }

                </ul>
            </div>
        </div>
    );
}