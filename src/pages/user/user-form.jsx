import React, { PureComponent } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

export default class UserForm extends PureComponent {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool.isRequired,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }

  render() {
    const { roles, isUpdate } = this.props;

    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
    return (
      <Form ref={this.formRef} {...formItemLayout}>
        <Form.Item name="username" label="Username">
          <Input placeholder="Please enter your username." />
        </Form.Item>

        {isUpdate ? null : (
          <Form.Item name="password" label="Password">
            <Input type="password" placeholder="Please enter your password." />
          </Form.Item>
        )}

        <Form.Item name="phone" label="Phone">
          <Input type="phone" placeholder="Please enter your phone number." />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input type="email" placeholder="Please enter your email address." />
        </Form.Item>

        <Form.Item name="role_id" label="Role">
          <Select placeholder="Please select your role.">
            {roles.map((r) => (
              <Select.Option value={r._id} key={r._id}>
                {r.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
