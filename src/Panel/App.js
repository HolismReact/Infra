import * as React from "react";
import User from "./User";
import Branding from "./Branding";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import MainRouting from "../Base/MainRouting";
import { BrowserRouter } from 'react-router-dom';

const App = () => (
    <BrowserRouter>
        <Header />
        <Branding />
        <User />
        <Menu />
        <div id="content">
            <MainRouting />
        </div>
        <Footer />
    </BrowserRouter>
);

export default App;