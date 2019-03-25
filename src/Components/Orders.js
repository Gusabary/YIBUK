import React from 'react'
import { Paper, withStyles, TextField, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent';
import { filter } from 'rsvp';

const contain = (content, filterKey) => {
    const strContent = content.toString();
    if (strContent.indexOf(filterKey) !== -1)
        return true;
    return false;
}

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
    constructor(props) {
        super(props)
        this.state = {
            filterKey: ['', '', '', ''],
            filteredOrders: this.props.orders,
        }
        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
    }

    filter() {
        const attr = ['userId', 'bookId', 'quantity', 'time']
        let tmp = [];
        this.props.orders.forEach(order => {
            let isShown = true;
            for (let i = 0; i <= 3; i++) {
                if (!contain(order[attr[i]], this.state.filterKey[i])) {
                    isShown = false;
                    break;
                }
            }
            if (isShown)
                tmp.push(order)
        });
        this.setState({
            filteredOrders: tmp,
        })
    }

    handleChange = field => event => {
        let tmp = this.state.filterKey
        tmp[field] = event.target.value
        this.setState({
            filterKey: tmp
        })
        this.filter();
    }

    componentWillMount() {
        //this.props.identity == 1 ?
        this.props.onLoadAll() /*:
            this.props.onLoadById(this.props.userId);*/
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredOrders: nextProps.orders,
        })
    }

    render() {
        let filterBar = [];
        for (let i = 0; i <= 3; i++) {
            const filterInput =
                (<td>
                    <TextField
                        value={this.state.filterKey[i]}
                        onChange={this.handleChange(i)}
                    />
                </td>)
            filterBar.push(filterInput)
        }
        return (
            <React.Fragment>
                <div>
                    <table>
                        <tr>
                            {filterBar}
                        </tr>
                        <tr>
                            <th onClick={() => alert('ha')}>UserId</th>
                            <th>BookId</th>
                            <th>Quantity</th>
                            <th>Time</th>
                        </tr>
                        {this.state.filteredOrders.map((order, index) => (
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