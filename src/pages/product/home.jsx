import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const Option = Select.Option;

export default class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "productName",
      searchName: "",
      loading: false,
      total: 0,
      products: [
        // {
        //   status: 1,
        //   imgs: ["1.jpg", "2.jpg"],
        //   _id: "0001",
        //   name: "Thinkpad-480",
        //   desc: "X390, T490",
        //   price: 66000,
        //   pCategoryID: "60c0f5b4d61f7fdc39c0f06a",
        //   categoryID: "60c11144d61f7fdc39c0f07b",
        //   detail: "abcdefg",
        //   __v: 0,
        // },
        // {
        //   status: 1,
        //   imgs: ["3.jpg", "4.jpg"],
        //   _id: "0002",
        //   name: "Asus-888",
        //   desc: "i7-860 8G",
        //   price: 6799,
        //   pCategoryID: "60c0f5b4d61f7fdc39c0f06a",
        //   categoryID: "60c1113dd61f7fdc39c0f07a",
        //   detail: "xyzuvwijklmn",
        //   __v: 0,
        // },
      ],
    };

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
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/product/addupdate", product)
                }
              >
                update
              </Button>
            </span>
          );
        },
      },
    ];
  }


  updateStatus = async (productID, status) => {
    const result = await reqUpdateStatus(productID, status);
    if (result.status === 0) {
      message.success('update success')
      this.getProducts(this.pageNum)
    }
  }

  // updateStatus = (id, newStatus) => {
  //   //console.log(id)
  //   const { products } = this.state;
  //   const p = products.find((p) => p._id === id);
  //   // console.log(p);
  //   if (p) {
  //     p.status = newStatus;
  //   }
  //   const newProducts = [...products];
  //   this.setState({ products: newProducts });
  // };

  getProducts = async (pageNum) => {
    
    this.pageNum = pageNum; // save pageNum for display in updateStatus
    
    this.setState({ loading: true });

    const { searchName, searchType } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      });
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    this.setState({ loading: false });

    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({ total, products: list });
    }
  };

  componentDidMount() {
    //this.initColumns();
    this.getProducts(1)
  }

  render() {
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 200 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">Search on Name</Option>
          <Option value="productDesc">Search on Description</Option>
        </Select>
        <Input
          value={searchName}
          placeholder="enter search keyword"
          style={{ width: 250, margin: "0 15px" }}
          onChange={(e) => this.setState({ searchName: e.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          Search
        </Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        <PlusOutlined />
        Add
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
