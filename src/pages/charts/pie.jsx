import React, { Component } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

export default class Pie extends Component {
  getOptions = () => {
    return {
      title: {
        text: "Web Traffic Sources",
        subtest: "fake",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "traffic source",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "search engine" },
            { value: 735, name: "direct visit" },
            { value: 580, name: "email marketing" },
            { value: 484, name: "affiliate ad" },
            { value: 300, name: "video ad" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };

  getOptions2 = () => {
    return {
      backgroundColor: "#2c343c",

      title: {
        text: "",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },

      tooltip: {
        trigger: "item",
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "traffic source",
          type: "pie",
          radius: "90%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "direct visit" },
            { value: 310, name: "email marketing" },
            { value: 274, name: "affiliate ad" },
            { value: 235, name: "video ad" },
            { value: 400, name: "search engine" },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };
  };

  render() {
    return (
      <div>
        <Card title="Pie Chart 1">
          <ReactEcharts option={this.getOptions()} style={{ height: 300 }} />
        </Card>
        <Card title="Pie Chart 2" style={{backgroundColor: "#2c343c"}} headStyle={{ color: "white" }}>
          <ReactEcharts option={this.getOptions2()} style={{ height: 300 }} />
        </Card>
      </div>
    );
  }
}
