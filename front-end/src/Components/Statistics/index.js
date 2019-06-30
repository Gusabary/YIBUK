import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Grid, Tabs, Tab } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import Book from './Book'
import Customer from './Customer'
import Loading from '../Loading';

const styles = theme => ({

});

const mapStateToProps = state => ({
    identity: state.user.identity,
    userId: state.user.userId,
    orders: state.orders.orders,
    isLoading: state.common.isLoading,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    onLoadAll: (token) =>
        dispatch({ type: 'LOAD_ORDERS', payload: agent.Orders.showAll(token) }),
    onLoadById: (userId, token) =>
        dispatch({ type: 'LOAD_ORDERS', payload: agent.Orders.showById(userId, token) })
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
        this.props.identity == 1 ?
            this.props.onLoadAll(this.props.token) :
            this.props.onLoadById(this.props.userId, this.props.token);
    }

    render() {
        const { classes } = this.props;
        if (this.props.isLoading)
            return (
                <Loading />
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