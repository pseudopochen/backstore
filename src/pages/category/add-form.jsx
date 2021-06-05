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
  };

  formRef = React.createRef();
  inputRef = React.createRef();

  componentDidMount() {
    this.props.setForm(this.formRef.current);
    this.inputRef.current.focus({ curser: "end" });
  }

  render() {
    //   if (this.inputRef.current) {
    // this.inputRef.current.focus({curser: "end"})
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
