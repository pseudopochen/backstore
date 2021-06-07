import React, { Component } from "react";
import PropTypes from "prop-types";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
  };

  constructor(props) {
    super(props);

    let fileList = [];
    if (props.imgs && props.imgs.length > 0) {
      fileList = props.imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: "http://localhost:5000" + img,
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

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
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

  handleChange = ({ fileList }) => {
    this.setState({ fileList });

    this.props.setImgs(this.state.fileList.map((f) => f.name));
  };

  render() {
    // console.log("pw props:", this.props.imgs);
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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // upload to this address, e.g., "/manage/img/upload"
          accept="image/*" // only accept image files
          name="image" // request name
          listType="picture-card"
          fileList={fileList} // array of files that have already been uploaded
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
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
