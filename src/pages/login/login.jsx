import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.less";
import logo from "../../assets/images/logo.png";
import { login } from '../../redux/actions'
// import { reqLogin } from "../../api";
// import memoryUtils from "../../utils/memoryUtils";
// import storageUtils from "../../utils/storageUtils";

// Login router component

// antd 4.x form is very different from antd 3.x form
// examples from https://www.cnblogs.com/haimengqingyuan/p/13526068.html

class Login extends Component {
  usernameRules = [
    {
      required: true,
      whitespace: true,
      message: "Please input your Username!",
    },
    { min: 4, message: "Username must have at least 4 characters!" },
    { max: 12, message: "Username cannot exceed 12 characters!" },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Username can contain only letters, numbers and underscores!",
    },
  ];

  passwordValidator = async (_, value) => {
    if (!value) {
      throw new Error("Password is required!");
    } else if (value.length < 4) {
      throw new Error("Password length cannot be shorter than 4!");
    } else if (value.length > 12) {
      throw new Error("Password length cannot be longer than 12!");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      throw new Error(
        "Password can contain only letters, numbers and underscores!"
      );
    }
  };

  formRef = React.createRef();

  onFinish = async (e) => {
    // const { username, password } = e;
    // console.log(username, password);

    // validateFields examples found at https://blog.csdn.net/gzericlee/article/details/114986246
    const { username, password } = await this.formRef.current.validateFields();
    this.props.login(username, password)
    // const result = await reqLogin(username, password);

    // if (result.status === 0) {
    //   message.success("login success!");

    //   const user = result.data;
    //   console.log(result);
    //   memoryUtils.user = user;
    //   storageUtils.saveUser(user);

    //   this.props.history.replace("/home");
    // } else {
    //   message.error("login failure: " + result.msg);
    // }

  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    const user = this.props.user //memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>Back Store Administration System</h1>
        </header>
        <section className="login-content">
          <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
          <h2>User Login</h2>

          <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onReset={this.onReset}
          >
            <Form.Item name="username" rules={this.usernameRules}>
              <Input
                size="large"
                className="login-form-username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ validator: this.passwordValidator }]}
            >
              <Input
                size="large"
                className="login-form-password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="reset"
                className="login-form-button"
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)