import * as React from "react";
import User from "./User";
import Branding from "./Branding";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import MainRouting from "../MainRouting";

const App = () => (
    <>
        <Header />
        <Branding />
        <User />
        <Menu />
        <div id="content">
            <MainRouting />
        </div>
        <Footer />
    </>
);

export default App;