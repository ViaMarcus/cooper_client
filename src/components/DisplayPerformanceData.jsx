import React, { Component } from 'react'
import { Table } from "semantic-ui-react"
import { getData } from "../modules/performanceData"

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
        }

        return (
            <div>
                {dataIndex}
            </div>
        )
    }
}

export default DisplayPerformanceData