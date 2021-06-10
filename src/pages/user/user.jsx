import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import sd from "silly-datetime";
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'

import UserForm from "./user-form";

const sdf = (t) => sd.format(new Date(t));

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: [],
      user: {},
      isShown: false,
      isUpdate: false,
    };
    this.initColumns();
  }

  initColumns = () => {
    this.columns = [
      { title: "Name", dataIndex: "username" },
      { title: "E-mail", dataIndex: "email" },
      { title: "Phone", dataIndex: "phone" },
      { title: "Create Time", dataIndex: "create_time", render: sdf },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (role_id) => this.roleNames[role_id],
        //   this.state.roles.find((r) => r._id === role_id).name,
      },
      {
        title: "Actions",
        render: (user) => (
          <span>
            <Button type="link" onClick={() => this.showUpdate(user)}>
              update
            </Button>
            <Button type="link" onClick={() => this.deleteUser(user)}>
              delete
            </Button>
          </span>
        ),
      },
    ];
  };

  deleteUser = (user) => {
    const { users } = this.state;
    //console.log(users);
    Modal.confirm({
      title: `Do you want to delete ${user.username}?`,

      // must be arrow function when using "this" inside
      onOk: async () => {
        const idx = users.findIndex((u) => u._id === user._id);
        users.splice(idx, 1);
        this.setState({ users: [...users] });
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('delete user success!');
        } else {
          message.error(result.msg);
        }
      },
      onCancel() {
        //console.log("canceled");
      },
    });
  };

  showUpdate = (user) => {
    this.setState({ isShown: true, isUpdate: true, user }, () => {
      this.form.setFieldsValue(user);
    });
  };

  addOrUpdateUser = async () => {
    try {
      this.setState({ isShown: false });

      const user = await this.form.validateFields();
      //   console.log(values);
      this.form.resetFields();

      if (this.state.isUpdate) {
        // let { user } = this.state;
        // user = { ...user, ...values };
        // // console.log(user);
        // const idx = this.state.users.findIndex((u) => u._id === user._id);
        // // console.log(idx)
        // this.state.users[idx] = user;
        // this.setState({ user, users: [...this.state.users] });
        user._id = this.state.user._id

      }

      const result = await reqAddOrUpdateUser(user);
      if (result.status === 0) {
        message.success(`${this.state.isUpdate ? 'update' : 'add'} user success!`)
        this.getUsers();
      }

    } catch (e) {
      console.log(e);
    }
  };

  getUsers = async () => {
    const result = await reqUsers();
    //console.log(result)
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.initRoleNames(roles);
      //console.log(users)
      this.setState({ users, roles })
    }
  }

  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = roleNames;
  };

  componentDidMount() {
    // const users_fake = [
    //   {
    //     _id: "001",
    //     username: "a",
    //     password: "xxx",
    //     email: "a@b.c",
    //     phone: "123-456-7890",
    //     create_time: Date.now(),
    //     role_id: "01",
    //   },
    //   {
    //     _id: "002",
    //     username: "b",
    //     password: "xxx",
    //     email: "b@c.d",
    //     phone: "123-456-7890",
    //     create_time: Date.now(),
    //     role_id: "02",
    //   },
    // ];
    // const roles_fake = [
    //   { _id: "01", name: "manager" },
    //   { _id: "02", name: "test" },
    // ];
    //this.setState({ users: users_fake, roles: roles_fake });
    //this.initRoleNames(roles_fake);
    // console.log(this.roleNames)
    this.getUsers();
  }

  render() {
    const { users, roles, isShown, isUpdate } = this.state;

    const title = (
      <Button
        type="primary"
        onClick={() => this.setState({ isShown: true, isUpdate: false })}
      >
        Add User
      </Button>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          visible={isShown}
          title={(isUpdate ? "Update" : "Add") + " User"}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isShown: false });
            this.form.resetFields();
          }}
        >
          <UserForm
            roles={roles}
            setForm={(f) => (this.form = f)}
            isUpdate={isUpdate}
          />
        </Modal>
      </Card>
    );
  }
}
