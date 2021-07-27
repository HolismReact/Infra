import { Link } from 'react-router-dom';
import menuItems from '../Menu.js';

const Menu = () => {
    return <>
        <ul>
            {
                menuItems.map(item => <li key={item.url}>
                        <Link to={item.url}>{item.title}</Link>
                </li>)
            }
        </ul>
    </>
};

export default Menu;