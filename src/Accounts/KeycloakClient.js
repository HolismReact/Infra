import Holism from "../Base/Holism";

// todo: redirect user to "403" page if his role is not equivalent to role in .env file

const KeycloakClient = {
    keycloak: null,
    user: 'Anonymous',
    role: () => {
        if (!KeycloakClient.keycloak.tokenParsed) {
            return 'User';
        }
        var role = KeycloakClient.keycloak.tokenParsed.roles.filter(i => i.charAt(0) === i.charAt(0).toUpperCase());
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
            KeycloakClient.keycloak = new window["Keycloak"]({
                url: conf.url,
                realm: conf.realm,
                clientId: conf.client,
                redirectUrl: document.location.origin
            });

            KeycloakClient.keycloak.init({
                checkLoginIframe: false
            }).then(function (auth) {
                if (auth) {
                    var name;
                    if (KeycloakClient.keycloak.tokenParsed['family_name'] || KeycloakClient.keycloak.tokenParsed['given_name']) {
                        name = KeycloakClient.keycloak.tokenParsed['given_name'] + ' ' + KeycloakClient.keycloak.tokenParsed['family_name']
                    } else {
                        name = KeycloakClient.keycloak.tokenParsed.preferred_username;
                    }
                    KeycloakClient.user = name;
                    Holism.emit(Holism.accountUpdated);
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                } else {
                    console.error('Not Authenticated');
                    KeycloakClient.keycloak.login();
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            throw new Error('Security is not configured.')
        }
    }
}

export default KeycloakClient;