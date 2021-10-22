// todo: redirect user to "403" page if his role is not equivalent to role in .env file
import app from './App';

let keycloak = null;
let token = '';
let user = '';
let userGuid = '';

const Account = {
    keycloak: () => {
        return keycloak || {};
    },
    token: () => {
        return token;
    },
    user: () => {
        return user;
    },
    userGuid: () => {
        return userGuid;
    },
    createLoginUrl: () => {
        if (typeof Account.keycloak().createLoginUrl === 'function') {
            return Account.keycloak().createLoginUrl();
        }
        return 'NA';
    },
    updateToken: () => {
        return Account.keycloak().updateToken();
    },
    createAccountUrl: () => {
        if (typeof Account.keycloak().createAccountUrl === 'function') {
            return Account.keycloak().createAccountUrl();
        }
        return 'NA';
    },
    createLogoutUrl: () => {
        return Account.keycloak().createLogoutUrl();
    },
    logout: () => {
        return Account.keycloak().logout();
    },
    role: () => {
        if (!Account.keycloak().tokenParsed) {
            return 'User';
        }
        var role = keycloak.tokenParsed.roles.filter(i => i.charAt(0) === i.charAt(0).toUpperCase());
        if (role.length > 0) {
            return role[0];
        }
        return 'User';
    },
    checkLogin: (callback) => {
        var conf = {
            url: process.env.REACT_APP_ACCOUNTS_URL + '/auth',
            realm: process.env.REACT_APP_ACCOUNTS_REALM,
            client: process.env.REACT_APP_ACCOUNTS_CLIENT
        };

        if (conf.url && conf.realm && conf.client) {
            if (!window["Keycloak"]) {
                throw new Error("Keycloak script is not loaded. Make sure internet is connected, and make sure accounts panel is up and running.")
            }
            keycloak = new window["Keycloak"]({
                url: conf.url,
                realm: conf.realm,
                clientId: conf.client,
                redirectUrl: document.location.origin
            });

            keycloak.init({
                checkLoginIframe: false
            }).then(function (auth) {
                if (auth) {
                    var name;
                    if (keycloak.tokenParsed['family_name'] || keycloak.tokenParsed['given_name']) {
                        name = keycloak.tokenParsed['given_name'] + ' ' + keycloak.tokenParsed['family_name']
                    } else {
                        name = keycloak.tokenParsed.preferred_username;
                    }
                    token = keycloak.token;
                    user = name;
                    userGuid = keycloak.subject;
                    app.emit(app.accountUpdated);
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.error('Not Authenticated');
                    keycloak.login();
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            throw new Error('Security is not configured.')
        }
    }
}

export default Account;