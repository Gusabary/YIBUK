import React from 'react'
import { Paper, withStyles, TextField, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent';

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

class Orders extends React.Component {
    componentWillMount() {
        this.props.identity == 1 ?
            this.props.onLoadAll() :
            this.props.onLoadById(this.props.userId);
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <table>
                        <tr>
                            <th>UserId</th>
                            <th>BookId</th>
                            <th>Quantity</th>
                            <th>Time</th>
                        </tr>
                    {this.props.orders.map((order, index) => (
                        <tr>
                            <td>{order.userId}</td>
                            <td>{order.bookId}</td>
                            <td>{order.quantity}</td>
                            <td>{order.time}</td>
                        </tr>)
                        )}
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));