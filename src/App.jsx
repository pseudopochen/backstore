import React, { Component } from "react";
// import { Button, message } from "antd";
// import 'antd/dist/antd.less' // no need to import antd.less here because of the babel-plugin-import in craco.config.js
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

export default class App extends Component {
  //   handleClick = () => {
  //     message.success("Success!");
  //   };

  render() {
    return (
      //   <Button type="primary" onClick={this.handleClick}>
      //     Primary
      //   </Button>

      <BrowserRouter>
        <Switch>
          <Route path={"/login"} component={Login}></Route>
          <Route path={"/"} component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
