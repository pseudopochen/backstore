import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Button, Modal} from 'antd';
import sd from "silly-datetime";

import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from '../../utils/storageUtils'

import "./index.less";

class Header extends Component {
  state = {
    currentTime: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
    weather: "Sunny",
    dayPictureURL: "http://api.map.baidu.com/images/weather/day/qing.png",
  };

  getTitle = () => {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((citem) => citem.key === path);
        if (cItem) {
          title = item.title;
        }
      }
    });
    return title;
  };

  logout = () => {
    Modal.confirm({
        content: "Are your sure?",
        onOk: () => {
            storageUtils.removeUser()
            memoryUtils.user = {}
            this.props.history.replace('/login')
        }
    })
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const currentTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      this.setState({ currentTime });
    }, 1000);
  }

  componentWillUnmount() {
      clearInterval(this.timer)
  }

  render() {
    const { currentTime, dayPictureURL, weather } = this.state;
    const { username } = memoryUtils.user;

    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome, {username}</span>
          <Button type="link" onClick={this.logout}>Logout</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{this.getTitle()}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureURL} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
