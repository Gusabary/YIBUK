import React from 'react'
import { withStyles, Switch, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import Loading from '../Loading';

const styles = theme => ({

});

const mapStateToProps = state => ({
    customers: state.customers.customers,
    isLoading: state.common.isLoading,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    onLoad: (token) =>
        dispatch({ type: 'LOAD_CUSTOMERS', payload: agent.Customers.show(token) })
})

class Validity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validity: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(index) {
        let validity = this.state.validity;
        validity[index] = 1 - validity[index];
        this.setState({ validity });
    }

    componentWillMount() {
        this.props.onLoad(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        let validity = [];
        nextProps.customers.forEach(customer => {
            validity.push(customer.validity);
        });
        this.setState({ validity });
    }

    componentWillUnmount() {
        this.state.validity.forEach((validity, index) => {
            if (validity !== this.props.customers[index].validity) {
                agent.Customers.toggle(this.props.customers[index].userId, validity, this.props.token);
            }
        })
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
                        {this.props.customers.map((customer, index) =>
                            <TableRow>
                                <TableCell>{customer.userId}</TableCell>
                                <TableCell>{customer.username}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={this.state.validity[index] === 1}
                                        onChange={() => this.handleChange(index)}
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