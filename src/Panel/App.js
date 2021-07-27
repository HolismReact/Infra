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
        <div className="flex min-h-screen">
            <div id="sidebar" className="md:visible w-64 bg-yellow-100">
                <Branding />
                <User />
                <Menu />
            </div>
            <div id="content" className="flex flex-col h-screen justify-between flex-1">
                <Header />
                <div id="content">
                    <MainRouting />
                </div>
                <Footer />
            </div>
        </div>
    </BrowserRouter>
);

export default App;