import React from 'react'
import { Paper, withStyles, TextField, Button, Switch, ListItemIcon, ListItemSecondaryAction, ListItemText, ListItem, List } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';

const styles = theme => ({

});

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    customers: state.customers.customers,
})

const mapDispatchToProps = dispatch => ({
    onChange: (userId, index, targetValidity) => {
        agent.Customers.toggle(userId, targetValidity);
        dispatch({ type: 'TOGGLE_VALIDITY', payload: { index, targetValidity } });
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})


class Validity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.customers,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(userId, index, targetValidity) {
        let newCustomers = this.state.customers;
        newCustomers[index].validity = targetValidity;

        this.setState({
            customers: newCustomers,
        })
        this.props.onChange(userId, index, targetValidity);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <List>
                    {this.state.customers.map((customer, index) =>
                        <ListItem>
                            <ListItemText>
                                {customer.username} &nbsp;
                                {customer.email} &nbsp;
                                {customer.userId}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <Switch
                                    checked={customer.validity === 1}
                                    onChange={() => this.handleChange(customer.userId, index, 1 - customer.validity)}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>)}
                </List>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Validity));