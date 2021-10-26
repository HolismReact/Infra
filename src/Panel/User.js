import app from "../Base/App";
import { useState, useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const iconStyle = { style: { fill: "#1F2937", fontSize: 16 } }

const Item = ({ url, icon, background, title, handler }) =>
    <li className={background + " mr-1 ml-1 rounded-md cursor-pointer"} onClick={handler}>
        <a href={url} className="h-9 w-12 flex items-center justify-center" title={app.t(title)} data-toggle="tooltip">
            {icon}
        </a>
    </li>

export default function User({ onClick }) {

    const history = useHistory();

    const [user, setUser] = useState(app.user);
    const [role, setRole] = useState(app.role());

    useEffect(() => {
        app.on(app.accountUpdated, () => {
            setUser(app.user);
            setRole(app.role());
        });
    }, [])

    return (
        <div id='userPanel' className="flex flex-col justify-center	">
            {/* <img src="image/profile.jpg" className="w-11 h-11 m-auto rounded-full mb-4" alt="User profile" /> */}
            {/* <span id='userProfile' className="w-11 h-11 m-auto rounded-full mb-4">
                {ProfileIcon}
            </span> */}
            <div className="flex flex-col justify-center mt-4">
                <div className="text-center font-medium antialiased tracking-wide	text-gray-800 mb-2">{user}</div>
                <p className="text-center text-gray-400 text-sm mb-4">{app.t(role)}</p>
                <ul className="flex items-center justify-center">
                    <Item
                        icon={<PersonIcon {...iconStyle} />}
                        url={app.createAccountUrl()}
                        title="Profile"
                        background="bg-green-200"
                        handler={onClick}
                    />
                    <Item
                        icon={<SettingsIcon {...iconStyle} />}
                        title="Settings"
                        background="bg-blue-200"
                        handler={() => {
                            onClick();
                            history.push('/settings');
                        }}
                    />
                    <Item
                        icon={<ExitToAppIcon {...iconStyle} />}
                        handler={() => app.logout()}
                        title="Logout"
                        background="bg-red-200"
                    />
                </ul>
            </div>
        </div>
    );
}