import { Link } from 'react-router-dom';
import menuItems from '../Menu.js';

const menuItemRenderer = (menuItem) =>
    <>
        {
            menuItem.url
                ?
                <Link to={menuItem.url}>{menuItem.title}</Link>
                :
                <span>{menuItem.title}</span>
        }
    </>

const Menu = () => {
    const liClass = 'py-4 p-2 mt-4';
    return <>
        <ul>
            {
                menuItems.map(item => <li key={item.url || item.title} className={liClass}>
                    {
                        item.items && item.items.length > 0
                            ?
                            <>
                                <span>{item.title}</span>
                                <ul>
                                    {
                                        item.items.map(childItem => <li key={childItem.url} className={liClass}>
                                            {menuItemRenderer(childItem)}
                                        </li>)
                                    }
                                </ul>
                            </>
                            :
                            menuItemRenderer(item)
                    }
                </li>)
            }
        </ul>
    </>
};

export default Menu;