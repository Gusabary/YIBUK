import React from 'react'
import { Paper, withStyles, TextField, Button, Typography, Grid, Tabs, Tab } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../../agent';
import AddBook from './AddBook';
import Validity from './Validity';
import ManageBook from './ManageBook';

const styles = theme => ({

});

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() })
        dispatch({ type: 'LOAD_MODE_2' })
    }
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

    componentWillMount() {
        this.props.onLoad();
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
                    <Validity />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Manage));