import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import { Layout } from "antd";

// import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import Category from "../category/category";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

// Admin router component

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const user = this.props.user //memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: "20px", backgroundColor: "white" }}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "gray" }}>
            It is recommended to use Google Chrome to get a better user
            experience.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)