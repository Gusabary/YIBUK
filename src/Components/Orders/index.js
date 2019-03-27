import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import { generateArray, sort, getCopy, filter } from '../../auxiliary'
import Filter from './Filter'

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
            filterKey: ['', '', '', '', { startTime: null, endTime: null }],
            filteredOrders: this.props.orders,
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

    handleChange = field => async event => {
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
            this.props.onLoadAll() :
            this.props.onLoadById(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredOrders: nextProps.orders,
        })
    }

    render() {
        const { classes } = this.props;
        let filterBar = [];
        for (let i = 0; i <= 3; i++) {
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
                                <TableCell>OrderId</TableCell>
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
                                            value={this.state.filterKey[4].startTime}
                                            onChange={this.handleChange('startTime')}
                                            className={classes.text}
                                        />
                                        to
                                        <TextField
                                            type='datetime-local'
                                            value={this.state.filterKey[4].endTime}
                                            onChange={this.handleChange('endTime')}
                                            className={classes.text}
                                        />
                                    </TableCell>
                                    {/*<Filter
                                        filterKey={this.state.filterKey}
                                        onChange={(field) => this.handleChange(field)()}
                                    />*/}
                                </TableRow>
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