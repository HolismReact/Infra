import routes from '../Routes.js';
import { Route, Switch } from 'react-router-dom';

const MainRouting = () => {
    return (
        <Switch>
            {
                routes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        exact
                        component={route.component} />)
            }
        </Switch>
    );
}

export default MainRouting;