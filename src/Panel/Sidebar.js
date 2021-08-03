import Branding from './Branding.js';
import User from './User.js';
import Menu from './Menu.js';

export default function Sidebar() {
    return (
        <div className="w-1/5 bg-white">
            <Branding />
            <User />
            <Menu />
        </div>
    );
}