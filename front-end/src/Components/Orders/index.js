import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import { generateArray, sort, getCopy, filter } from '../../auxiliary'
import Filter from './Filter'
/*
const formatTime = time => {
    let formated = time.replace(/T/, ' ').slice(0, -9);
    return formated;
}*/

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
    },
    column1: {
        width: '23%',
    },
    column2: {
        width: '17%',
    },
    column3: {
        width: '26%',
    },
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

class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterKey: ['', '', '', '', { startTime: null, endTime: null }],
            filteredOrders: [],
            filterOpen: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter() {
        const filterBy = ['orderId', 'userId', 'bookId', 'quantity', 'time']
        const filteredOrders = filter(this.props.orders, filterBy, this.state.filterKey);
        this.setState({
            filteredOrders,
        })
    }

    handleChange = async (field, event) => {
        let tmp;
        if (field === 'startTime' || field === 'endTime')
            tmp = this.state.filterKey[4]
        else
            tmp = this.state.filterKey
        tmp[field] = event.target.value
        let tmp2 = this.state.filterKey
        if (field === 'startTime' || field === 'endTime')
            tmp2[4] = tmp;
        else
            tmp2 = tmp;

        await this.setState({
            filterKey: tmp2
        })
        this.handleFilter();
    }

    componentWillMount() {
        this.props.identity == 1 ?
            this.props.onLoadAll(this.props.token) :
            this.props.onLoadById(this.props.userId, this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredOrders: nextProps.orders,
        })
    }

    render() {
        const { classes } = this.props;
        if (this.props.isLoading)
            return (
                <h1>Loading...</h1>
            )
        else
            return (
                <React.Fragment>
                    <div>
                        <Button
                            variant='contained'
                            onClick={() => this.setState({ filterOpen: !this.state.filterOpen })}
                            className={classes.button}
                        >
                            Filter
                    </Button>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.column1}>OrderId</TableCell>
                                    <TableCell className={classes.column2}>UserId</TableCell>
                                    <TableCell className={classes.column2}>BookId</TableCell>
                                    <TableCell className={classes.column2}>Quantity</TableCell>
                                    <TableCell className={classes.column3}>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.filterOpen &&
                                    <Filter
                                        filterKey={this.state.filterKey}
                                        onChange={(field, e) => this.handleChange(field, e)}
                                    />
                                }
                                {this.state.filteredOrders.map((order, index) => {
                                    let isInOneOrder = false;
                                    if (index > 0 && order.orderId === this.state.filteredOrders[index - 1].orderId)
                                        isInOneOrder = true;
                                    return (
                                        <TableRow>
                                            <TableCell>{isInOneOrder ? '-' : order.orderId}</TableCell>
                                            <TableCell>{order.userId}</TableCell>
                                            <TableCell>{order.bookId}</TableCell>
                                            <TableCell>{order.quantity}</TableCell>
                                            <TableCell>{order.time}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </React.Fragment>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));