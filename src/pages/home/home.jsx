import React, { Component } from "react";
import { Card, Statistic, DatePicker, Timeline } from "antd";
import {
  QuestionCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import moment from "moment";

import Line from "./line";
import Bar from "./bar";
import "./home.less";

const dateFormat = "YYYY/MM/DD";
const { RangePicker } = DatePicker;

export default class Home extends Component {
  state = { isVisited: true };

  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };

  render() {
    const { isVisited } = this.state;
    return (
      <div className="home">
        <Card
          className="home-card"
          title="Product Total Number"
          extra={
            <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          }
          style={{ width: 250 }}
          headStyle={{ color: "rgba(0,0,0,.45)" }}
        >
          <Statistic
            value={2015163}
            suffix="units"
            style={{ fontWeight: "bolder" }}
          />
          <Statistic
            value={0.5}
            valueStyle={{ fontSize: 15 }}
            preffix="Weekly"
            suffix={
              <div>
                %<ArrowDownOutlined style={{ color: "red", marginLeft: 10 }} />
              </div>
            }
          />
          <Statistic
            value={0.1}
            valueStyle={{ fontSize: 15 }}
            preffix="Daily"
            suffix={
              <div>
                %<ArrowUpOutlined style={{ color: "green", marginLeft: 10 }} />
              </div>
            }
          />
        </Card>

        <Line />

        <Card
          className="home-content"
          title={
            <div className="home-menu">
              <span
                className={
                  isVisited
                    ? "home-menu-active home-menu-visited"
                    : "home-menu-visited"
                }
                onClick={this.handleChange(true)}
              >
                Web Traffic
              </span>
              <span
                className={isVisited ? "" : "home-menu-active"}
                onClick={this.handleChange(false)}
              >
                Sales
              </span>
            </div>
          }
          extra={
            <RangePicker
              defaultValue={[
                moment("2021/01/01", dateFormat),
                moment("2021/06/01", dateFormat),
              ]}
              format={dateFormat}
            />
          }
        >
          <Card
            className="home-table-left"
            title={isVisited ? "web traffic trend" : "sales trend"}
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<ReloadOutlined />}
          >
            <Bar />
          </Card>

          <Card
            title="tasks"
            extra={<ReloadOutlined />}
            className="home-table-right"
          >
            <Timeline>
              <Timeline.Item color="green">
                new version iteration meeting
              </Timeline.Item>
              <Timeline.Item color="green">
                complete web design meeting
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>API Requests Check</p>
                <p>Functionality Check</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Login Design</p>
                <p>Permission Check</p>
                <p>Page Layout Check</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    );
  }
}
