import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import sd from "silly-datetime";

import AddForm from "./add-form";
import AuthForm from "./auth-form";
import memoryUtils from "../../utils/memoryUtils";

const sdf = (t) => sd.format(new Date(t), "YYYY-MM-DD HH:mm:ss");

export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false,
      isShowAuth: false,
      role: {},
      roles: [
        {
          menus: ["/home", "/role", "/charts/bar"],
          _id: "01",
          name: "test",
          create_time: 1554639521749,
          auth_time: 1558410329436,
          auth_name: "",
        },
        {
          menus: ["/home", "/role", "/product", "/category", "/charts/bar"],
          _id: "02",
          name: "manager",
          create_time: 1554639521749,
          auth_time: 1558410329436,
          auth_name: "admin",
        },
        {
          menus: [
            "/home",
            "/role",
            "/product",
            "/category",
            "/charts/bar",
            "/charts/line",
            "/charts/pie",
          ],
          _id: "03",
          name: "admin",
          create_time: 1554639521749,
          auth_time: 1558410329436,
          auth_name: "admin",
        },
      ],
    };
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: sdf,
      },

      {
        title: "Authorization Time",
        dataIndex: "auth_time",
        render: sdf,
      },
      {
        title: "Authorizer ",
        dataIndex: "auth_name",
      },
    ];

    this.authRef = React.createRef();
  }

  addRole = async () => {
    try {
      const value = await this.form.validateFields();
      const { roleName } = value;
      this.form.resetFields();
      this.setState({ isShowAdd: false });

      const newRole = {
        menus: [],
        _id: String(this.state.roles.length + 1).padStart(2, "0"),
        name: roleName,
        create_time: Date.now(),
        auth_time: null,
        auth_name: "",
      };
      //console.log(newRole)
      this.setState((state) => ({ roles: [newRole, ...state.roles] }));
    } catch (err) {
      message.error(err.message);
    }
  };

  updateRole = () => {
    this.setState({ isShowAuth: false });
    const { role } = this.state;
    const menus = this.authRef.current.getMenus();
    role.menus = menus;
    role.auth_name = memoryUtils.user.username;
    role.auth_time = Date.now();
    // console.log("upateRole: ", role);
    this.setState({ roles: [...this.state.roles] });
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        // console.log(role);
        this.setState({ role });
      },
    };
  };

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state;

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          Create Role
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
          Set Permissions
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: "radio", selectedRowKeys: [role._id] }}
          onRow={this.onRow}
        />

        <Modal
          title="Add Role"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
            this.form.resetFields();
          }}
        >
          <AddForm setForm={(form) => (this.form = form)} />
        </Modal>

        <Modal
          title="Set Permission"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false });
            this.authRef.current.resetMenus();
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    );
  }
}
