import React, { Component } from "react";
import { Card, Table, Button } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default class Category extends Component {
  state = {
    loading: false,
    categories: [],
    subCategories: [],
    parentId: "0",
    parentName: "",
  };

  initColumns = () => {
    this.columns = [
      { title: "Name of Category", dataIndex: "name" },
      {
        title: "Actions",
        width: 300,
        render: (category) => (
          <span>
            <Button type="link">modify</Button>
            {this.state.parentId === "0" ? (
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
      parentId: "0",
      parentName: "",
      subCategories: [],
    });
  };

  showSubCategories = (category) => {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      //   console.log("parentId:", this.state.parentId);
      this.getCategories();
    });
  };

  getCategories = () => {
    this.setState({ loading: true });
    if (this.state.parentId === "0") {
      setTimeout(() => {
        this.setState({
          categories: [
            { parentID: "0", _id: "001", name: "Appliance", __v: 0 },
            { parentID: "0", _id: "002", name: "Computer", __v: 0 },
            { parentID: "0", _id: "003", name: "Book", __v: 0 },
            { parentID: "0", _id: "004", name: "Clothes", __v: 0 },
            { parentID: "0", _id: "005", name: "Food", __v: 0 },
            { parentID: "0", _id: "006", name: "Toy", __v: 0 },
            { parentID: "0", _id: "007", name: "Medicine", __v: 0 },
            { parentID: "0", _id: "008", name: "Car-related", __v: 0 },
            { parentID: "0", _id: "009", name: "Container", __v: 0 },
          ],
        });
        this.setState({ loading: false });
      }, 1000); // simulate ajax request delays of 1000 ms
    } else {
      setTimeout(() => {
        if (this.state.parentId === "001") {
          this.setState({
            subCategories: [
              { parentID: "001", _id: "010", name: "TV", __v: 0 },
              { parentID: "001", _id: "011", name: "Refrigerator", __v: 0 },
              { parentID: "001", _id: "012", name: "Stove", __v: 0 },
              { parentID: "001", _id: "013", name: "Washing Machine", __v: 0 },
              { parentID: "001", _id: "014", name: "Dryer", __v: 0 },
              { parentID: "001", _id: "015", name: "Microwave Oven", __v: 0 },
            ],
          });
        } else if (this.state.parentId === "002") {
          this.setState({
            subCategories: [
              { parentID: "002", _id: "016", name: "Desktop", __v: 0 },
              { parentID: "002", _id: "017", name: "Laptop", __v: 0 },
              { parentID: "002", _id: "018", name: "MacBook", __v: 0 },
              { parentID: "002", _id: "019", name: "Apple Air", __v: 0 },
              { parentID: "002", _id: "020", name: "MacBook Pro", __v: 0 },
              { parentID: "002", _id: "021", name: "Dell", __v: 0 },
            ],
          });
        }
        this.setState({ loading: false });
      }, 1000);
    }
  };

  componentDidMount() {
    this.initColumns();
    //console.log(this.columns)
    this.getCategories();
  }

  render() {
    const title =
      this.state.parentId === "0" ? (
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
      <Button type="primary">
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
            this.state.parentId === "0"
              ? this.state.categories
              : this.state.subCategories
          }
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 5,
            showQuickJumper: true,
          }}
        />
      </Card>
    );
  }
}
