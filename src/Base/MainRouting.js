import routes from '../Routes.js';
import { Routes, Route, Link } from "react-router-dom";
import NotFound from '../Panel/NotFound';

const MainRouting = () => {
    return (
        <Routes>
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
        </Routes>
    );
}

export default MainRouting;