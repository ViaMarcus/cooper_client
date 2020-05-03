import React, { Component } from 'react'
import { Table } from "semantic-ui-react"
import { getData } from "../modules/performanceData"
import { Line, Pie } from "react-chartjs-2"

class DisplayPerformanceData extends Component {
    state = {
        performanceData: null
    }

    componentDidMount() {
        this.getPerformanceData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.updateIndex != prevProps.updateIndex) {
            this.getPerformanceData()
        }
    }

    async getPerformanceData() {
        let result = await getData();
        this.setState({ performanceData: result.data.entries}, () => {
            this.props.indexUpdated();
        })
    }

    render() {
        let dataIndex;
        let charts;

        if (this.state.performanceData != null) {
            dataIndex = (
                <Table>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Distance</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                    </Table.Row>
                    {this.state.performanceData.map(item => {
                        return (
                            <Table.Row>
                                <Table.Cell>{new Date(item.created_at).toString().substring(0,21)}</Table.Cell>
                                <Table.Cell>{item.data.distance}</Table.Cell>
                                <Table.Cell>{item.data.message}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table>
            )
            const labels = this.state.performanceData.map(entry => {
                return entry.created_at.substring(0,10)
            })
            const values = this.state.performanceData.map(entry => {
                return entry.data.distance
            })
            let scores = this.state.performanceData.map(entry => {
                return entry.data.message
            })
            let lineChartData= {
                labels: labels,
                datasets: [{
                    label: "Run History",
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    data: values,
                    }]
            }
            let pieLabels = ['Poor','Below average','Average','Above average','Excellent']
            let pieChartData = {
                labels: pieLabels,
                datasets: [{
                    data: pieLabels.map(msg => scores.filter(score => score == msg).length ),
                    backgroundColor: ["red", "orange","yellow","green","blue"]
                }]
            }
            console.log(pieChartData)
            charts = (
                <>
                    <Line data={lineChartData}/>
                    <Pie data={pieChartData}/>
                </>
            )
        }

        return (
            <div id="show-data">
                {dataIndex}
                <div id="charts">
                    {charts}
                </div>
            </div>
        )
    }
}

export default DisplayPerformanceData