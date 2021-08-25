import Branding from './Branding.js';
import User from './User.js';
import Menu from './Menu.js';

export default function Sidebar({ onClick }) {
    return (
        <div className="h-full">
            <Branding onClick={onClick} />
            <User onClick={onClick} />
            <Menu onClick={onClick} />
        </div>
    );
}