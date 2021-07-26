import * as React from "react";
import { Admin } from 'react-admin';
import dataProvider from '../DataProvider';
import authProvider from '../Accounts/AuthProvider';
import resources from "../Resources";
import Logout from '../Accounts/Logout';

const getResources = () => {
    return new Promise((resolve, reject) => {
        window.saeed = resources;
        if (!resources.length) {
            console.error('Create a Resources.js file in the root, and make sure it export resources array, and it contains at least one resource');
            reject('Resources are not defined for the admin panel.');
        }
        else {
            resolve(resources);
        }
    });
}

const App = () => (
    <Admin
        title={process.env.REACT_APP_BRAND}
        dataProvider={dataProvider}
        authProvider={authProvider}
        logoutButton={Logout}
    >
        {getResources}
    </Admin>
);

export default App;