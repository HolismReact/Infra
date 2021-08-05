import Holism from "../Base/Holism";

const KeycloakClient = {
    keycloak: null,
    user: null,
    checkLogin: () => {
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
            }).success(function (auth) {
                if (auth) {
                    var name;
                    if (KeycloakClient.keycloak.tokenParsed['family_name'] || KeycloakClient.keycloak.tokenParsed['given_name']) {
                        name = KeycloakClient.keycloak.tokenParsed['given_name'] + ' ' + KeycloakClient.keycloak.tokenParsed['family_name']
                    } else {
                        name = KeycloakClient.keycloak.tokenParsed.preferred_username;
                    }
                    KeycloakClient.user = name;
                    Holism.emit(Holism.accountUpdated);
                } else {
                    console.error('Not Authenticated');
                    KeycloakClient.keycloak.login();
                }
            })
        } else {
            throw new Error('Security is not configured.')
        }
    }
}

export default KeycloakClient;