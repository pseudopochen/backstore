import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import sd from "silly-datetime";
import {connect} from "react-redux";

import {logout} from '../../redux/actions'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import AddForm from "./add-form";
import AuthForm from "./auth-form";
// import memoryUtils from "../../utils/memoryUtils";
// import storageUtils from '../../utils/storageUtils'


const sdf = (t) => sd.format(new Date(t), "YYYY-MM-DD HH:mm:ss");

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false,
      isShowAuth: false,
      role: {},
      roles: [
        // {
        //   menus: ["/home", "/role", "/charts/bar"],
        //   _id: "01",
        //   name: "test",
        //   create_time: 1554639521749,
        //   auth_time: 1558410329436,
        //   auth_name: "",
        // },
        // {
        //   menus: ["/home", "/role", "/product", "/category", "/charts/bar"],
        //   _id: "02",
        //   name: "manager",
        //   create_time: 1554639521749,
        //   auth_time: 1558410329436,
        //   auth_name: "admin",
        // },
        // {
        //   menus: [
        //     "/home",
        //     "/role",
        //     "/product",
        //     "/category",
        //     "/charts/bar",
        //     "/charts/line",
        //     "/charts/pie",
        //   ],
        //   _id: "03",
        //   name: "admin",
        //   create_time: 1554639521749,
        //   auth_time: 1558410329436,
        //   auth_name: "admin",
        // },
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

      const result = await reqAddRole(roleName);
      if (result.status === 0) {
        message.success("add role success!");
        const role = result.data;
        //console.log(role)
        this.setState({ roles: [role, ...this.state.roles] });
      } else {
        message.error(result.msg);
      }
      // const newRole = {
      //   menus: [],
      //   // _id: String(this.state.roles.length + 1).padStart(2, "0"),
      //   name: roleName,
      //   create_time: Date.now(),
      //   auth_time: null,
      //   auth_name: "",
      // };
      //console.log(newRole)
      // this.setState((state) => ({ roles: [newRole, ...state.roles] }));
    } catch (err) {
      message.error(err.message);
    }
  };

  updateRole = async () => {
    this.setState({ isShowAuth: false });
    const { role } = this.state;
    const menus = this.authRef.current.getMenus();
    role.menus = menus;
    role.auth_name = this.props.user.username;
    role.auth_time = Date.now();
    // console.log("upateRole: ", role);

    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      if (this.props.user.role._id === role._id) {
        // memoryUtils.user = {};
        // storageUtils.removeUser();
        // this.props.history.replace('/login')
        this.props.logout();
        message.success('current user permission changed, re-login!')
      }
      else {
        message.success('update success!')
        this.setState({ roles: [...this.state.roles] });
      }
    } else {
      message.error(result.msg)
    }
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        // console.log(role);
        this.setState({ role });
      },
    };
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles })
    }
  }

  componentDidMount() {
    this.getRoles();
  }

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
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({ role });
            },
          }}
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

export default connect(
  state => ({user: state.user}),
  {logout}
)(Role)