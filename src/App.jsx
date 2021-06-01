import React, { Component } from "react";
import { Button, message } from "antd";
// import 'antd/dist/antd.less' // no need to import here because of babel-plugin-import in craco.config.js

export default class App extends Component {
  handleClick = () => {
    message.success("Success!");
  };

  render() {
    return (
      <Button type="primary" onClick={this.handleClick}>
        Primary
      </Button>
    );
  }
}
