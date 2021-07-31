import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Branding from './Branding.js';
import User from './User.js';
import menuItems from '../Menu.js'
import '../Style/Sidebar.css'

export default function SidebarMenu() {

    function toggleSubmenu(event) {
        console.log("toggleSubmenu");
        let e = event.target;
        let parentClass = "list-item"
        while (!e.classList.contains(parentClass)) {
            e = e.parentElement;
        }
        if (e.classList.contains("active"))
            e.classList.remove("active")
        else
            e.classList.add("active")
        return;
    }
    return (
        <div className="navigation">
            <Branding />
            <User />
            <div className="navigation-menu-body">
                <ul>
                    {
                        menuItems.map((item, index) => {
                            if (item.childern && item.childern.length > 0) {
                                return (
                                    <Fragment key={index}>
                                        <li className="navigation-divider">{item.title}</li>
                                        <li className="list-item">
                                            <button onClick={(e) => toggleSubmenu(e)}>
                                                <i className="fa fa-diamond icon" aria-hidden="true"></i>
                                                <span>{item.title}</span>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </button>
                                            <ul className="submenu">
                                                {
                                                    item.childern.map((child, indexchild) => {
                                                        return <li key={indexchild}> <Link to={child.url} >{child.title}</Link></li>
                                                    })
                                                }
                                            </ul>
                                        </li>

                                    </Fragment>
                                );
                            }
                            else {
                                return (
                                    <Fragment key={index}>

                                        <li className="navigation-divider">{item.title}</li>,
                                        <li className="list-item">
                                            <Link to={item.url} >
                                                <i className="fa fa-diamond icon" aria-hidden="true"></i>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    </Fragment>)
                            }
                        })
                    }

                </ul>
            </div>
        </div>
    );
}
