import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';

const styles = theme => ({

});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

const getRank = (orders, startTime, endTime) => {
    let customersInRank = [];
    const start = Date.parse(startTime)
    const end = Date.parse(endTime)
    orders.forEach(order => {
        const time = Date.parse(order.time)
        if (start > time || end < time)
            return;
        let hasExisted = false;
        customersInRank.forEach(customer => {
            if (customer.userId === order.userId) {
                customer.purchases += order.quantity
                hasExisted = true;
            }
        })
        if (!hasExisted) {
            const tmp = {
                userId: order.userId,
                purchases: order.quantity,
            }
            customersInRank.push(tmp);
        }
    });

    for (let i = 0; i < customersInRank.length - 1; i++)
        for (let j = i + 1; j < customersInRank.length; j++)
            if (customersInRank[i].purchases < customersInRank[j].purchases) {
                const tmp = customersInRank[j]
                customersInRank[j] = customersInRank[i]
                customersInRank[i] = tmp;
            }
    if (customersInRank.length > 0)
        customersInRank[0].rank = 1;
    for (let i = 1; i < customersInRank.length; i++)
        if (customersInRank[i].purchases === customersInRank[i - 1].purchases)
            customersInRank[i].rank = customersInRank[i - 1].rank
        else
            customersInRank[i].rank = i + 1
    return customersInRank
}

class Customer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customersInRank: getRank(this.props.orders, null, null),
            startTime: null,
            endTime:null,
        }
        this.handleTimeChange=this.handleTimeChange.bind(this)
    }
    handleTimeChange = (field) => async event => {
        await this.setState({
            [field]: event.target.value
        })
        this.setState({
            customersInRank: getRank(this.props.orders, this.state.startTime, this.state.endTime)
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            customersInRank: getRank(nextProps.orders, this.state.startTime, this.state.endTime)
        })
    }
    render() {
        return (
            <React.Fragment>
                from
                <TextField
                    type='datetime-local'
                    value={this.state.startTime}
                    onChange={this.handleTimeChange('startTime')}
                />
                to
                <TextField
                    type='datetime-local'
                    value={this.state.endTime}
                    onChange={this.handleTimeChange('endTime')}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>UserId</TableCell>
                            <TableCell>Purchases</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customersInRank.map((customer) => (
                            <TableRow>
                                <TableCell>{customer.rank}</TableCell>
                                <TableCell>{customer.userId}</TableCell>
                                <TableCell>{customer.purchases}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Customer));