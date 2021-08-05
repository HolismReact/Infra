import Branding from './Branding.js';
import User from './User.js';
import Menu from './Menu.js';

export default function Sidebar({ onClick }) {
    return (
        <div className="w-72 absolute z-10 lg:w-1/5 lg:static bg-white h-full">
            <Branding onClick={onClick} />
            <User onClick={onClick} />
            <Menu onClick={onClick} />
        </div>
    );
}