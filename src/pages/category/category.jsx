import React, { Component } from "react";
import { Card, Table, Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import AddForm from "./add-form";

const categories_fake = [
  { parentID: "0", _id: "001", name: "Appliance", __v: 0 },
  { parentID: "0", _id: "002", name: "Computer", __v: 0 },
  { parentID: "0", _id: "003", name: "Book", __v: 0 },
  { parentID: "0", _id: "004", name: "Clothes", __v: 0 },
  { parentID: "0", _id: "005", name: "Food", __v: 0 },
  { parentID: "0", _id: "006", name: "Toy", __v: 0 },
  { parentID: "0", _id: "007", name: "Medicine", __v: 0 },
  { parentID: "0", _id: "008", name: "Car-related", __v: 0 },
  { parentID: "0", _id: "009", name: "Container", __v: 0 },
  // { parentID: "0", _id: "022", name: "abc", __v: 0 },
];

const subCategories_001_fake = [
  { parentID: "001", _id: "010", name: "TV", __v: 0 },
  { parentID: "001", _id: "011", name: "Refrigerator", __v: 0 },
  { parentID: "001", _id: "012", name: "Stove", __v: 0 },
  { parentID: "001", _id: "013", name: "Washing Machine", __v: 0 },
  { parentID: "001", _id: "014", name: "Dryer", __v: 0 },
  { parentID: "001", _id: "015", name: "Microwave Oven", __v: 0 },
];

const subCategories_002_fake = [
  { parentID: "002", _id: "016", name: "Desktop", __v: 0 },
  { parentID: "002", _id: "017", name: "Laptop", __v: 0 },
  { parentID: "002", _id: "018", name: "MacBook", __v: 0 },
  { parentID: "002", _id: "019", name: "Apple Air", __v: 0 },
  { parentID: "002", _id: "020", name: "MacBook Pro", __v: 0 },
  { parentID: "002", _id: "021", name: "Dell", __v: 0 },
];

export default class Category extends Component {
  updateFormRef = React.createRef();
  updateInputRef = React.createRef();

  state = {
    loading: false,
    categories: [],
    subCategories: [],
    parentID: "0",
    parentName: "",
    showStatus: 0, // 0: no modal dialogs, 1: show Add modal, 2: show Update modal
  };

  showAdd = () => {
    this.setState({ showStatus: 1 }, () => {
      this.addFormRef.setFieldsValue({ parentID: this.state.parentID });
    });
  };

  showUpdate = (category) => {
    this.category = category;
    this.setState({ showStatus: 2 }, () => {
      this.updateFormRef.current.setFieldsValue({
        categoryName: category.name,
      });
      this.updateInputRef.current.focus({ cursor: "start" });
    });
  };

  // hide modal dialogs

  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };

  //

  addCategory = async () => {
    try {
      //const { parentID, categoryName } = this.addFormRef.getFieldsValue();
      const { parentID, categoryName } = await this.addFormRef.validateFields();
      // console.log(parentID, categoryName);

      this.handleCancel();
      let pnam = "0";
      if (parentID !== "0") {
        pnam = this.state.categories.find((c) => c._id === parentID).name;
      }

      let count = String(
        categories_fake.length +
          subCategories_001_fake.length +
          subCategories_002_fake.length +
          1
      ).padStart(3, "0");
      if (parentID === "0") {
        categories_fake.unshift({
          parentID: "0",
          _id: count,
          name: categoryName,
          __v: 0,
        });
        // console.log(categories_fake);
        this.setState({ parentID: "0", categories: [...categories_fake] });
      } else if (parentID === "001") {
        subCategories_001_fake.unshift({
          parentID: "001",
          _id: count,
          name: categoryName,
          __v: 0,
        });
        this.setState({
          parentID,
          parentName: pnam,
          subCategories: [...subCategories_001_fake],
        });
      } else if (parentID === "002") {
        subCategories_002_fake.unshift({
          parentID: "002",
          _id: count,
          name: categoryName,
          __v: 0,
        });
        this.setState({
          parentID,
          parentName: pnam,
          subCategories: [...subCategories_002_fake],
        });
      }
      //this.setState({})
      // this.initColumns();
      // this.getCategories();
      this.addFormRef.resetFields();
    } catch (e) {
      console.log(e);
      message.error(e.errorFields[0].errors[0]);
    }
  };

  //

  updateCategory = async () => {
    //const { categoryName } = this.updateFormRef.current.getFieldsValue();
    try {
      this.handleCancel();
      const { categoryName } =
        await this.updateFormRef.current.validateFields();

      this.category.name = categoryName;
      let clst;
      if (this.category.parentID === "0") {
        clst = categories_fake;
      } else if (this.category.parentID === "001") {
        clst = subCategories_001_fake;
      } else if (this.category.parentID === "002") {
        clst = subCategories_002_fake;
      }
      clst.forEach((c) => {
        if (c._id === this.category._id) {
          c.name = this.category.name;
        }
      });
      //this.updateFormRef.current.resetFields();
      this.getCategories();
    } catch (e) {
      console.log(e);
      message.error(e.errorFields[0].errors[0]);
    }
  };

  //

  initColumns = () => {
    this.columns = [
      { title: "Name of Category", dataIndex: "name" },
      {
        title: "Actions",
        width: 300,
        render: (category) => (
          <span>
            <Button type="link" onClick={() => this.showUpdate(category)}>
              update
            </Button>
            {this.state.parentID === "0" ? (
              <Button
                type="link"
                onClick={() => this.showSubCategories(category)}
              >
                sub-categories
              </Button>
            ) : null}
          </span>
        ),
      },
    ];
  };

  showCategories = () => {
    this.setState({
      parentID: "0",
      parentName: "",
      subCategories: [],
    });
  };

  showSubCategories = (category) => {
    this.setState({ parentID: category._id, parentName: category.name }, () => {
      //   console.log("parentID:", this.state.parentID);
      this.getCategories();
    });
  };

  getCategories = () => {
    this.setState({ loading: true });
    if (this.state.parentID === "0") {
      setTimeout(() => {
        this.setState(
          {
            categories: categories_fake,
          }
          // () => {
          //   console.log("state: ", this.state.categories, this.state.parentID);
          // }
        );
        this.setState({ loading: false });
      }, 100); // simulate ajax request delays of 100 ms
    } else {
      setTimeout(() => {
        if (this.state.parentID === "001") {
          this.setState({
            subCategories: subCategories_001_fake,
          });
        } else if (this.state.parentID === "002") {
          this.setState({
            subCategories: subCategories_002_fake,
          });
        }
        this.setState({ loading: false });
      }, 100);
    }
  };

  componentDidMount() {
    this.initColumns();
    //console.log(this.columns)
    this.getCategories();
  }

  render() {
    const title =
      this.state.parentID === "0" ? (
        "Level 1 Categories"
      ) : (
        <span>
          <Button type="link" onClick={this.showCategories}>
            Level 1 Categories
          </Button>{" "}
          <ArrowRightOutlined style={{ marginRight: "5px" }} />
          {this.state.parentName}
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        Add
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          loading={this.state.loading}
          rowKey="_id"
          bordered
          columns={this.columns}
          dataSource={
            this.state.parentID === "0"
              ? this.state.categories
              : this.state.subCategories
          }
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true,
          }}
        />

        <Modal
          title="Add"
          visible={this.state.showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categories={this.state.categories}
            parentID={this.state.parentID}
            setForm={(f) => (this.addFormRef = f)}
          />
        </Modal>

        <Modal
          title="Update"
          visible={this.state.showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <Form ref={this.updateFormRef}>
            <Form.Item
              name="categoryName"
              rules={[
                { required: true, message: "category name is required!" },
              ]}
            >
              <Input
                ref={this.updateInputRef}
                placeholder="enter category name"
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
