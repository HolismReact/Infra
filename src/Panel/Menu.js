import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import menuItems from '../Menu.js'

const Menu = () => {
    return <ul className="">
        {
            menuItems.map((item) => {
                if (item.children && item.children.length > 0) {
                    return (
                        <Fragment key={item.title}>
                            {/* <li className="navigation-divider">{item.title}</li> */}
                            <li className=""
                            >
                                <button>
                                    <i className="" aria-hidden="true"></i>

                                    <span>{item.title}</span>
                                    <span className="" >
                                        <span className=""></span>
                                    </span>
                                </button>
                                <ul className="" >
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
                        <li className="">{item.title}</li>
                        <li className="">
                            <Link to={item.url} >
                                <i className="" aria-hidden="true"></i>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    </Fragment>)
                }
            })
        }
    </ul>
}

export default Menu;