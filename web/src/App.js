import React from "react";
import Login from "./Home/Login";
import Join from "./Home/Join";
import Regist from "./Main/Regist";
import TimeTable from "./Main/TimeTable";
import CurrentTimeTable from "./Main/CurrentTimeTable";
import { BrowserRouter ,Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Main from "./pages/Main";
import Detail from "./pages/Detail"
import "./index.css";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path ="/" component = {Home} />
            <Route path = "/home" component = {Home} />
            <Route path = "/login" component = {Login}/>
            <Route path = "/join" component = {Join}/>
            <Route path = "/regist" component = {Regist}/>
            <Route path = "/set" component = {Setting}/>
            <Route path = "/detail" component = {Detail}/>
            <Route path ="/cur" component = {CurrentTimeTable}/>
            <Route path ="/main" component = {Main}/>
        </BrowserRouter>
    );
};

export default App;