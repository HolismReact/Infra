import routes from '../Routes.js';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../Panel/NotFound';

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
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default MainRouting;