import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent';

const contain = (content, filterKey) => {
    const strContent = content.toString();
    if (strContent.indexOf(filterKey) !== -1)
        return true;
    return false;
}

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
    },
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
            filterKey: ['', '', ''],
            filteredOrders: this.props.orders,
            startTime: null,
            endTime: null,
            filterOpen: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    filter() {
        const attr = ['userId', 'bookId', 'quantity']
        let tmp = [];
        const startTime = Date.parse(this.state.startTime)
        const endTime = Date.parse(this.state.endTime)
        //console.log(startTime)
        //console.log(endTime)
        this.props.orders.forEach(order => {
            let isShown = true;
            for (let i = 0; i <= 2; i++) {
                if (!contain(order[attr[i]], this.state.filterKey[i])) {
                    isShown = false;
                    break;
                }
            }
            const orderTime = Date.parse(order.time)
            if (startTime > orderTime || endTime < orderTime)
                isShown = false;
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
        //console.log(this.state.filterKey)
        this.filter();
    }

    handleTimeChange = (field) => async event => {
        await this.setState({
            [field]: event.target.value
        })
        //console.log(this.state.startTime)
        //console.log(this.state.endTime)
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
        const { classes } = this.props;
        let filterBar = [];
        for (let i = 0; i <= 2; i++) {
            const filterInput =
                (<TableCell>
                    <TextField
                        value={this.state.filterKey[i]}
                        onChange={this.handleChange(i)}
                        className={classes.text}
                    />
                </TableCell>)
            filterBar.push(filterInput)
        }
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
                                <TableCell>UserId</TableCell>
                                <TableCell>BookId</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.filterOpen &&
                                <TableRow>
                                    {filterBar}
                                    <TableCell>
                                        from
                                    <TextField
                                            type='datetime-local'
                                            value={this.state.startTime}
                                            onChange={this.handleTimeChange('startTime')}
                                            className={classes.text}
                                        />
                                        to
                                    <TextField
                                            type='datetime-local'
                                            value={this.state.endTime}
                                            onChange={this.handleTimeChange('endTime')}
                                            className={classes.text}
                                        />
                                    </TableCell>
                                </TableRow>
                            }
                            {this.state.filteredOrders.map((order, index) => (
                                <TableRow>
                                    <TableCell>{order.userId}</TableCell>
                                    <TableCell>{order.bookId}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.time}</TableCell>
                                </TableRow>)
                            )}
                        </TableBody>
                    </Table>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));