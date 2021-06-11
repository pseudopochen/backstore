import React, { PureComponent } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { reqCategories, reqAddOrUpdateProduct } from "../../api";

// import {
//   categories_fake,
//   subCategories_001_fake,
//   subCategories_002_fake,
// } from "../category/category";

const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends PureComponent {
  constructor(props) {
    super(props);
    const updateProduct = props.location.state;
    const isUpdate = !!updateProduct;

    this.state = { options: [], imgs: [], isUpdate, updateProduct };
    if (isUpdate) {
      this.state.imgs = updateProduct.imgs;
    }
    // console.log("ctor:", isUpdate, this.state.imgs);

    this.formRef = React.createRef();
    this.pwRef = React.createRef();
    this.rtfRef = React.createRef();
  }

  // setImgs = (newImgs) => {
  //   this.setState({ imgs: [...newImgs, ...this.state.imgs] });
  // };

  initOptions = (categories, isLeaf=false) => {
    //console.log(categories)
    return categories.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf,
    }));
  };

  getCategories = async (parentID) => {
    const result = await reqCategories(parentID);
    if (result.status === 0) {
      const categories = result.data;
      if (parentID === "0") {
        const options = this.initOptions(categories);
        this.setState({ options });
      } else {
        return categories;
      }
    }
  };

  // getCategories = (parentID) => {
  //   if (parentID === "0") {
  //     const options = this.initOptions(categories_fake);
  //     this.setState({ options });
  //   } else if (parentID === "001") {
  //     return subCategories_001_fake;
  //   } else if (parentID === "002") {
  //     return subCategories_002_fake;
  //   } else {
  //     return [];
  //   }
  // };

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    targetOption.loading = true;
    const subCategory = await this.getCategories(targetOption.value);
    targetOption.loading = false;

    if (subCategory && subCategory.length > 0) {
      targetOption.children = this.initOptions(subCategory, true);
    } else {
      targetOption.isLeaf = true;
    }
    this.setState({ options: [...this.state.options] });
  };

  async componentDidMount() {
    await this.getCategories("0");

    const { isUpdate, updateProduct: product } = this.state;

    const categoryArr = [];
    let subCategory;
    if (isUpdate) {
      if (product.pCategoryID !== "0") {
        categoryArr.push(product.pCategoryID);

        subCategory = await this.getCategories(product.pCategoryID);
        const subOptions = this.initOptions(subCategory, true);

        const pOption = this.state.options.find(
          (o) => o.value === product.pCategoryID
        );
        if (pOption) {
          pOption.children = subOptions;
          //   console.log("subOptions: ", subOptions)
          this.setState({ options: [...this.state.options] });
        }
      }
      categoryArr.push(product.categoryID);

      this.formRef.current.setFieldsValue({
        name: product.name,
        desc: product.desc,
        price: product.price,
        category: categoryArr,
      });
    }
    // console.log(categoryArr);
  }

  onFinish = async (values) => {
    // console.log("received values of form", values);
    // //console.log(this.pwRef.current.getImgs());
    // console.log(this.state.imgs);
    // console.log(this.rtfRef.current.getDetail())

    const { name, desc, price, category } = values;
    let pCategoryID, categoryID;
    if (category.length === 1) {
      pCategoryID = "0";
      categoryID = category;
    } else {
      pCategoryID = category[0];
      categoryID = category[1];
    }
    // const imgs = this.state.imgs;
    const imgs = this.pwRef.current.getImgs();
    //console.log(imgs)
    const detail = this.rtfRef.current.getDetail();

    const product = {
      name,
      desc,
      price,
      pCategoryID,
      categoryID,
      imgs,
      detail,
    };

    if (this.state.isUpdate) {
      product._id = this.state.updateProduct._id;
    }
    //console.log(product);

    const result = await reqAddOrUpdateProduct(product);
    if (result.status === 0) {
      message.success(`${this.state.isUpdate? 'update' : 'add'} success!`)
      this.props.history.goBack();
    } else {
      message.error('error: ' + result.msg)
    }
  };

  render() {
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    const title = (
      <span>
        <Button
          type="link"
          size="large"
          onClick={() => this.props.history.goBack()}
        >
          <ArrowLeftOutlined style={{ fontSize: 20 }} />
        </Button>
        <span>{this.state.isUpdate ? "Update" : "Add"} Product</span>
      </span>
    );

    const { imgs } = this.state || {};
    //console.log(imgs)
    const { detail } = this.state.updateProduct || {};

    return (
      <Card title={title}>
        <Form {...formLayout} ref={this.formRef} onFinish={this.onFinish}>
          <Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Product name is required!" }]}
          >
            <Input placeholder="Please enter product name." />
          </Item>

          <Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "Product description is required!" },
            ]}
          >
            <TextArea
              placeholder="Please enter product description."
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>

          <Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Product price is required!" },
              {
                validator: (_, value) =>
                  value * 1 > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("Price must be larger than 0!")),
              },
            ]}
          >
            <Input
              type="number"
              addonBefore="$"
              placeholder="Please enter product price."
            />
          </Item>

          <Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Category is required!" }]}
          >
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              placeholder="Please select category."
            />
          </Item>

          <Item label="pics">
            {/* <PicturesWall ref={this.pwRef} setImgs={this.setImgs} imgs={imgs} /> */}
            {/* <PicturesWall setImgs={this.setImgs} imgs={imgs} /> */}
            <PicturesWall ref={this.pwRef} imgs={imgs} />
          </Item>

          <Item label="detail" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.rtfRef} detail={detail} />
          </Item>

          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}
