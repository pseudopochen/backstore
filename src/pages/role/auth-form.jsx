import React, { PureComponent } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends PureComponent {
  static propTypes = {
    role: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.treeNodes = this.getTreeNodes(menuList);
    //console.log(this.treeNodes)

    const { menus, _id } = this.props.role;
    this.state = {
      checkedKeys: menus,
      _id,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState._id !== nextProps.role._id) {
      return { _id: nextProps.role._id, checkedKeys: nextProps.role.menus };
    } else {
      return null;
    }
  }

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  getMenus = () => this.state.checkedKeys;
  resetMenus = () => {
    this.setState({checkedKeys: this.props.role.menus});
  };

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    return (
      <div>
        <Item label="Role Name">
          <Input value={role.name} disabled />
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          {this.treeNodes}
        </Tree>
      </div>
    );
  }
}
