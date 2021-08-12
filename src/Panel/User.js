import KeycloakClient from "../Accounts/KeycloakClient";
import Holism from "../Base/Holism";
import { useState, useEffect } from 'react';

const Icon = ({ url, svgContent, background, title, handler }) =>
    <li className={background + " mr-1 ml-1 rounded-md cursor-pointer"} onClick={handler}>
        <a href={url} className="h-9 w-12 flex items-center justify-center" title={title} data-toggle="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {svgContent}
            </svg>
        </a>
    </li>

const ProfileIcon =
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        className="h-full w-full text-gray-400"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
    </svg>

export default function User({ onClick }) {

    const [user, setUser] = useState(KeycloakClient.user);
    const [role, setRole] = useState(KeycloakClient.role());

    useEffect(() => {
        Holism.on(Holism.accountUpdated, () => {
            setUser(KeycloakClient.user);
            setRole(KeycloakClient.role());
        });
    }, [])

    return (
        <div id='userPanel' className="flex flex-col justify-center	">
            {/* <img src="image/profile.jpg" className="w-11 h-11 m-auto rounded-full mb-4" alt="User profile" /> */}
            <span id='userProfile' className="w-11 h-11 m-auto rounded-full mb-4">
                {ProfileIcon}
            </span>
            <div className="flex flex-col justify-center">
                <div className="text-center font-medium antialiased tracking-wide	text-gray-800 mb-2">{user}</div>
                <p className="text-center text-gray-400 text-sm mb-4">{role}</p>
                <ul className="flex items-center justify-center">
                    <Icon
                        svgContent={
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        }
                        url={KeycloakClient.keycloak.createAccountUrl()}
                        title="Profile"
                        background="bg-green-200"
                        handler={onClick}
                    />
                    <Icon
                        svgContent={
                            <>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </>
                        }
                        url="#"
                        title="Settings"
                        background="bg-blue-200"
                        handler={onClick}
                    />
                    <Icon
                        svgContent={
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        }
                        handler={() => KeycloakClient.keycloak.logout()}
                        title="Logout"
                        background="bg-red-200"
                    />
                </ul>
            </div>
        </div>
    );
}