import React from 'react'
import { withStyles, Switch, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';

const styles = theme => ({

});

const mapStateToProps = state => ({
    customers: state.customers.customers,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: 'LOAD_CUSTOMERS', payload: agent.Customers.show() })
})

class Validity extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(userId, targetValidity) {
        await agent.Customers.toggle(userId, targetValidity);
        this.props.onLoad();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>UserId</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Switch on/off</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.customers.map((customer) =>
                            <TableRow>
                                <TableCell>{customer.userId}</TableCell>
                                <TableCell>{customer.username}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={customer.validity === 1}
                                        onChange={() => this.handleChange(customer.userId, 1 - customer.validity)}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Validity));