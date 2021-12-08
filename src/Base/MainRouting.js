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
                        element={route.component} />)
            }
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default MainRouting;