import routes from './Routes';
import { Route, Switch } from 'react-router-dom';

const MainRouting = () => {
    return (
        <Route>
            <Switch>
                {routes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        exact
                        component={route.component} />)}
            </Switch>
        </Route>
    );
}

export default MainRouting;