import React from "react";
import Join from "./pages/Join";
import Regist from "./pages/Regist";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/LayoutMain";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Main from "./pages/Main";
import Record from "./pages/Record";
import "./index.css";
import Info from "./pages/Info";
import Device from"./pages/Device";
import DeviceModify from "./pages/DeviceModify";
import Login from "./pages/Login";
import Modify from "./pages/Modify";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
          <Route path="/regist" component={Regist} />
          <Route path="/set" component={Setting} />
          <Route path="/record" component={Record} />
          <Route path="/main" component={Main} />
          <Route path="/info" component={Info} />
          <Route path="/modify" component={Modify} />
          <Route path="/device" component={Device} />
          <Route path="/devicemodify" component = {DeviceModify}/>
          <Redirect to="/not-found" />
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
