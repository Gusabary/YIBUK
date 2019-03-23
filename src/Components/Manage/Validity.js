import React from 'react'
import { withStyles, Switch, ListItemSecondaryAction, ListItemText, ListItem, List } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';

const styles = theme => ({

});

const mapStateToProps = state => ({
    customers: state.customers.customers,
})

const mapDispatchToProps = dispatch => ({
    onChange: (index, targetValidity) => {
        dispatch({ type: 'TOGGLE_VALIDITY', payload: { index, targetValidity } });
    },
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

        agent.Customers.toggle(userId, targetValidity);
        this.props.onChange(index, targetValidity);
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