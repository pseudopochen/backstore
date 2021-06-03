import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuNodes = (mlst, path) => {
    // const path = this.props.location.pathname;

    return mlst.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find((citem) => citem.key === path);
        if (cItem) {
          this.openKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  //   componentDidMount() {
  //     this.menuNodes = this.getMenuNodes(menuList);
  //   }

  // static getDerivedStateFromProps() {
  //     this.menuNodes = this.getMenuNodes(menuList);
  // }

  render() {
    const path = this.props.location.pathname;
    const menuNodes = this.getMenuNodes(menuList, path);
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>Backstore</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >
          {menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
