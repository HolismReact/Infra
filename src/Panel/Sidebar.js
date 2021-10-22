import Branding from './Branding.js';
import User from './User.js';
import Menu from './Menu.js';

export default function Sidebar({ onClick }) {
    return (
        <div className="h-full pt-4">
            <Branding onClick={onClick} />
            <User onClick={onClick} />
            <Menu onClick={onClick} />
        </div>
    );
}