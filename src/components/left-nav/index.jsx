import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { connect } from "react-redux";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import { setHeadTitle } from "../../redux/actions";

import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuNodes = (mlst, path) => {
    mlst.forEach((item) => {
      if (item.key === path) {
        this.props.setHeadTitle(item.title);
      } else if (item.children) {
        item.children.forEach((citem) => {
          if (citem.key === path) {
            this.openKey = item.key;
            this.props.setHeadTitle(citem.title);
          }
        });
      }
    });
    return mlst.map((item) => {
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
        const cItem = item.children.find(
          (citem) => path.indexOf(citem.key) === 0
        );
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

    // componentDidUpdate() {
    //   //this.menuNodes = this.getMenuNodes(menuList);
    //   let path = this.props.location.pathname;
      
    // }

  // static getDerivedStateFromProps() {
  //     this.menuNodes = this.getMenuNodes(menuList);
  // }

  render() {
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }

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

export default connect((state) => ({}), {
  setHeadTitle,
})(withRouter(LeftNav));
