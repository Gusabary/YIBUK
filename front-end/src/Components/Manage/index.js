import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Grid, Tabs, Tab } from '@material-ui/core'
import { connect } from 'react-redux';
import ManageCustomer from './ManageCustomer';
import ManageBook from './ManageBook/index';

const styles = theme => ({

});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

class Manage extends React.Component {
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

    render() {
        const { classes } = this.props;
        
            return (
                <React.Fragment>
                    <Tabs fullWidth value={this.state.tabValue} onChange={this.handleTabValueChange}>
                        <Tab label="Book" />
                        <Tab label="Customer" />
                    </Tabs>

                    {this.state.tabValue == 0 ?
                        <ManageBook history={this.props.history} /> :
                        <ManageCustomer />
                    }
                </React.Fragment>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Manage));