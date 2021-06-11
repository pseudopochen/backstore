import React, { Component } from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from "echarts-for-react"

export default class Bar extends Component {

    state = {
        sales: [10, 15, 22, 43, 32, 5],
        inventory: [15, 10, 27, 35, 20, 15]
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 1),
            inventory: state.inventory.map(i => i - 1),
        }))
    }

    getOption = (sales, inventory) => {
        return {
            title: {
                text: '',
            },
            tooltip: {},
            legend: {
                data: ['sales','inventory'],
            },
            xAxis: {
                data: ["product1", "product2", "product3", "product4", "product5", "product6"],
            },
            yAxis: {},
            series: [{
                name: 'sales',
                type: 'bar',
                data: sales
            }, {
                name: 'inventory',
                type: 'bar',
                data: inventory
            }]
        }
    }

    render() {
        const {sales, inventory} = this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>Update</Button>
                </Card>
                <Card title="Bar Chart--">
                    <ReactEcharts option={this.getOption(sales, inventory)} />
                </Card>
            </div>
        )
    }
}
