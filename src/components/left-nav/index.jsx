import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { connect } from "react-redux";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import { setHeadTitle } from "../../redux/actions";
import memoryUtils from '../../utils/memoryUtils'

import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props);

    //const { path, openKey } = this.getPath(menuList, props);
    this.state = { path: "", openKey: "" };

    this.menuNodes = this.getMenuNodes(menuList);
  }

  //

  hasAuth = (item) => {
    const menus = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;
    const { key, isPublic } = item;
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      return !!item.children.find((c) => menus.indexOf(c.key) !== -1)
    }
    return false;
  }

  //
  getMenuNodes = (mlst) => {
    return mlst.map((item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          );
        } else {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      } else {
        return null;
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let path = nextProps.location.pathname;
    //console.log(path, 'prevState: ', prevState)

    if (path === prevState.path) {
      //console.log(prevState)
      return null;
    }

    if (path.indexOf("/product") === 0) {
      path = "/product";
    }

    let openKey = "";
    let findTitle = (mlst, parentKey) => {
      mlst.forEach((item) => {
        if (item.key === path) {
          nextProps.setHeadTitle(item.title);
          if (parentKey) {
            openKey = parentKey;
          }
        } else if (item.children) {
          findTitle(item.children, item.key)
        }
      })
    }

    findTitle(menuList, null);
    //console.log("openKey: ", openKey) 

    return { path, openKey };
  }

  render() {

    const { menuNodes } = this;
    const { path, openKey } = this.state; //this.getPath(menuList, this.props);
    //console.log("render--openKey: ", openKey)

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
          defaultOpenKeys={[openKey]}
        >
          {menuNodes}
        </Menu>
      </div>
    );
  }
}

export default connect((state) => ({}), {
  setHeadTitle,
})(withRouter(LeftNav));
