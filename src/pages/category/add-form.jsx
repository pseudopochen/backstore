import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;
const Item = Form.Item;

export default class AddForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    parentID: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
  };

  formRef = React.createRef();
  inputRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
    this.props.setInput(this.inputRef.current);
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
    const { categories, parentID } = this.props;
    return (
      <Form ref={this.formRef} initialValues={{ parentID }}>
        <Item name="parentID">
          <Select>
            <Option key="0" value="0">
              Level 1 Category
            </Option>
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="categoryName"
          rules={[
            {
              required: true,
              message: "category name is required!",
            },
          ]}
        >
          <Input ref={this.inputRef} placeholder="enter category name" />
        </Item>
      </Form>
    );
  }
}
