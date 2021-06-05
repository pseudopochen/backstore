import React, { Component } from "react";
import { Card, Select, Input, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    products: [
      {
        status: 1,
        imgs: ["1.jpg", "2.jpg"],
        _id: "0001",
        name: "Thinkpad-480",
        desc: "X390, T490",
        price: 66000,
        pCategoryID: "002",
        categoryID: "017",
        detail: "abcdefg",
        __v: 0,
      },
      {
        status: 1,
        imgs: ["3.jpg", "4.jpg"],
        _id: "0002",
        name: "Asus-888",
        desc: "i7-860 8G",
        price: 6799,
        pCategoryID: "002",
        categoryID: "016",
        detail: "xyzuvwijklmn",
        __v: 0,
      },
    ],
  };
  updateStatus = (id, newStatus) => {
    //console.log(id)
    const { products } = this.state;
    const p = products.find((p) => p._id === id);
    // console.log(p);
    if (p) {
      p.status = newStatus;
    }
    const newProducts = [...products];
    this.setState({ products: newProducts });
  };

  initColumns() {
    this.columns = [
      { title: "Name", dataIndex: "name" },
      { title: "Description", dataIndex: "desc" },
      { title: "Price", dataIndex: "price", render: (price) => "$" + price },
      {
        width: 100,
        title: "Status",
        //dataIndex: "status",
        render: (product) => {
          const { status, _id } = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status === 1 ? "off-shelf" : "for-sale"}
              </Button>
              <span>{status === 1 ? "for-sale" : "off-shelf"}</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "Action",
        render: (product) => {
          return (
            <span>
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/product/detail", { product })
                }
              >
                detail
              </Button>
              <Button type="link">update</Button>
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.initColumns();
    this.setState({});
  }

  render() {
    const { products } = this.state;

    const title = (
      <span>
        <Select value="1">
          <Option value="1">Search on Name</Option>
          <Option value="2">Search on Description</Option>
        </Select>
        <Input placeholder="keyword" style={{ width: 150, margin: "0 15px" }} />
        <Button type="primary">Search</Button>
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
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    );
  }
}
