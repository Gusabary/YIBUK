import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Grid, Tabs, Tab } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import Book from './Book'
import Customer from './Customer'

const styles = theme => ({

});

const mapStateToProps = state => ({
    identity: state.user.identity,
    userId: state.user.userId,
    orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
    onLoadAll: () =>
        dispatch({ type: 'LOAD_ORDERS', payload: agent.Orders.showAll() }),
    onLoadById: (userId) =>
        dispatch({ type: 'LOAD_ORDERS', payload: agent.Orders.showById(userId) })
})

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
        }

        this.handleTabValueChange = this.handleTabValueChange.bind(this);
    }

    handleTabValueChange(event, value) {
        this.setState({
            tabValue: value,
        })
    }

    componentWillMount() {
        this.props.onLoadAll();
    }

    render() {
        const { classes } = this.props;
        if (this.props.orders.length === 0)
            return (
                <h1>Loading...</h1>
            )
        else
        return (
            <React.Fragment>
                <Tabs fullWidth value={this.state.tabValue} onChange={this.handleTabValueChange}>
                    <Tab label="Book" />
                    <Tab label="Customer" />
                </Tabs>

                {this.state.tabValue == 0 ?
                    <Book orders={this.props.orders} /> :
                    <Customer orders={this.props.orders} />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Statistics));