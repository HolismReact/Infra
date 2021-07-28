import { Link } from 'react-router-dom';
import menuItems from '../Menu.js';

const menuItemClass = 'hover:bg-red-400 rounded-full px-2 py-4'

const menuItemRenderer = (menuItem) =>
    <>
        {
            menuItem.url
                ?
                <Link to={menuItem.url} className={menuItemClass}>{menuItem.title}</Link>
                :
                <span>{menuItem.title}</span>
        }
    </>

const Menu =
    <ul className='mt-4 bg-green-300 pl-8 pt-4 pb-4'>
        {
            menuItems.map(item =>
                <li key={item.url || item.title} className='mb-4'>
                    {
                        item.items && item.items.length > 0
                            ?
                            <>
                                <span className='mt-4'>{item.title}</span>
                                <ul className='pl-4'>
                                    {
                                        item.items.map(childItem => <li key={childItem.url} className='mt-2'>
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

export default Menu;