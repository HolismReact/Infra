import routes from '../Routes.js';
import { Routes, Route } from "react-router-dom";
import NotFound from '../Panel/NotFound';

const MainRouting = () => {
    return (
        <Routes>
            {
                routes.map(route => {
                    const Component = route.component;
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={<Component />}
                    >
                        {
                            route.children && route.children.map && route.children.length > 0
                            && route.children.map(childRoute => {
                                console.log(childRoute);
                                const ChildComponent = route.component;
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<Component />}
                                />
                            })
                        }
                    </Route>
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