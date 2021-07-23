import dataProvider from "../DataProvider";

const authProvider = {
    // authentication
    login: params => {
        return Promise.resolve();
        return dataProvider.post('login', params);
    },
    checkError: error => Promise.resolve(),
    checkAuth: params => Promise.resolve(),
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(),
    // authorization
    getPermissions: params => Promise.resolve(),
};

export default authProvider;