import routes from '../Routes.js';
import { Routes, Route } from "react-router-dom";
import NotFound from '../Panel/NotFound';

const MainRouting = () => {
    console.log(routes)
    return (
        <Routes>
            {
                routes.map(route => {
                    const Component = route.component;
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={<Component />}
                    />
                })
            }
            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    );
}

export default MainRouting;