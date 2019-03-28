import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Button, TextField, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
    userId: state.user.userId,
    identity: state.user.identity,
})

const mapDispatchToProps = dispatch => ({
    onLogOut: () =>
        dispatch({ type: "LOG_OUT" })
})

const styles = theme => ({
    main: {
        backgroundColor: theme.palette.primary.main,
        //position: 'absolute',
        marginTop: theme.spacing.unit * 15,
        //marginBottom: -theme.spacing.unit,
        marginLeft: -theme.spacing.unit,
        width: '101%',
        //height: theme.spacing.unit,
    },
    sub: {
        backgroundColor: theme.palette.primary.light,
        height: theme.spacing.unit * 6
    }
})

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.onLogOut();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="static" className={classes.main}>
                    <Toolbar>
                        
                            Youthful Imagination Brings U Knowledge.
                        
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));