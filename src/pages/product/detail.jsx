import React, { Component } from "react";
import { Card, List, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  categories_fake,
  subCategories_001_fake,
  subCategories_002_fake,
} from "../category/category";

export default class ProductDetail extends Component {
  state = {
    cName1: "", // level-1 category name
    cName2: "", // level-2 category name
  };

  componentDidMount() {
    console.log(
      categories_fake,
      subCategories_001_fake,
      subCategories_002_fake
    );

    const { pCategoryID, categoryID } = this.props.location.state.product;
    console.log(pCategoryID, categoryID);

    if (pCategoryID === "0") {
      const c1 = categories_fake.find((c) => c._id === categoryID);
      if (c1) {
        const cName1 = c1.name;
        this.setState({ cName1 });
      }
    } else {
      const c1 = categories_fake.find((c) => c._id === pCategoryID);
      //console.log(c1.name);
      let cName1;
      if (c1) {
        cName1 = c1.name;
      }
      let cName2;
      if (pCategoryID === "001") {
        const c2 = subCategories_001_fake.find((c) => c._id === categoryID);
        if (c2) {
          cName2 = c2.name;
        }
      } else if (pCategoryID === "002") {
        const c2 = subCategories_002_fake.find((c) => c._id === categoryID);
        //console.log(c2.name)
        if (c2) {
          cName2 = c2.name;
        }
      }
      this.setState({ cName1, cName2 });
    }
  }

  render() {
    const { name, desc, price, detail, imgs } =
      this.props.location.state.product;

    const { cName1, cName2 } = this.state;

    const title = (
      <span>
        <Button
          type="link"
          size="large"
          onClick={() => this.props.history.goBack()}
        >
          <ArrowLeftOutlined />
        </Button>
        <span>Product Detail</span>
      </span>
    );
    return (
      <div>
        <Card title={title} className="product-detail">
          <List>
            <List.Item>
              <span className="left">Name</span>
              <span>{name}</span>
            </List.Item>
            <List.Item>
              <span className="left">Description</span>
              <span>{desc}</span>
            </List.Item>
            <List.Item>
              <span className="left">Price</span>
              <span>{"$" + price}</span>
            </List.Item>
            <List.Item>
              <span className="left">Categories</span>
              <span>{cName1 + (cName2 ? " --> " + cName2 : "")}</span>
            </List.Item>
            <List.Item>
              <span className="left">Pictures</span>
              <span>
                {imgs.map((img) => (
                  <img key={img} src={img} className="product-img" alt="" />
                ))}
              </span>
            </List.Item>
            <List.Item>
              <span className="left">Details</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: detail,
                }}
              ></span>
            </List.Item>
          </List>
        </Card>
      </div>
    );
  }
}
