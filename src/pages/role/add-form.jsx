import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    // setInput: PropTypes.func.isRequired,
  };

  formRef = React.createRef();
  // inputRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
    // this.props.setInput(this.inputRef.current);
    // console.log("componentDidMount, input focus")
    // this.inputRef.current.focus({ cursor: "all" });
  }

  //   componentDidUpdate() {
  //       this.inputRef.current.focus({cursor: "start"})
  //   }

  render() {
    //   if (this.inputRef.current) {
    //     console.log("render, input focus")
    // this.inputRef.current.focus({cursor: "all",})
    //   }
    // const { categories, parentID } = this.props;
    return (
      <Form ref={this.formRef}>
        <Item
          name="roleName"
          label="Role Name"
          rules={[
            {
              required: true,
              message: "Role name is required!",
            },
          ]}
        >
          {/* <Input ref={this.inputRef} placeholder="Please enter role name." /> */}
          <Input autoFocus placeholder="Please enter role name." />
        </Item>
      </Form>
    );
  }
}
