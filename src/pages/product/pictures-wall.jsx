import React, { Component } from "react";
import PropTypes from "prop-types";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {reqDeleteImg} from '../../api'
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  static propTypes = {
    imgs: PropTypes.array,
    //setImgs: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let fileList = [];
    if (props.imgs && props.imgs.length > 0) {
      fileList = props.imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: BASE_IMG_URL + img,
      }));
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList,
    };

    // console.log("pw ctor: ", fileList);
  }

  //   state = {

  //     fileList: [
  //       {
  //         uid: "-1",
  //         name: "image.png",
  //         status: "done",
  //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //       },
  //       {
  //         uid: "-2",
  //         name: "image.png",
  //         status: "done",
  //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //       },
  //     ],
  //   };

  //   componentDidMount() {
  //     console.log("pw didMount: ", this.props.imgs);
  //   }

  //   getImgs = () => {
  //     return this.state.fileList.map((f) => f.name);
  //   };

  getImgs = () => {
    return this.state.fileList.map((f) => f.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    //console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    //console.log("handleChange...", file.status, file);

    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("upload success!");
        const { name, url } = result.data;
        file.name = name;
        file.url = url;
        //console.log(file===fileList[fileList.length - 1])
      } else {
        message.error("upload error.");
      }
    } else if (file.status === "removed") {
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('delete image success!')
      } else {
        message.error('delete image error.')
      }
    }

    this.setState({ fileList });

    //this.props.setImgs(this.state.fileList.map((f) => f.name));
  };

  render() {
    //console.log("pw props:", this.props.imgs);
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          accept="image/*" // only accept image files
          name="image" // request name for POST
          listType="picture-card"
          fileList={fileList} // array of files that have already been uploaded
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
