import React from 'react';
import { connect } from 'react-redux';
import { Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import DirectionsRun from '@material-ui/icons/DirectionsRun';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onLogOut: () =>
        dispatch({ type: "LOG_OUT" })
})

const styles = theme => ({
    buttons: {
        position: 'absolute',
        right: theme.spacing.unit * 4
    },
    icon: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
    },
    label: {
        marginTop: -theme.spacing.unit * 1.5,
    },
})

class LogButtons extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {!this.props.isLoggedin ? (
                    <div className={classes.buttons}>
                        <AccountCircle className={classes.icon} />
                        <Link to="SignIn">
                            <Button className={classes.label}>
                                Sign In
                            </Button>
                        </Link>
                        <AccountCircle className={classes.icon} />
                        <Link to="SignUp">
                            <Button className={classes.label}>
                                Sign Up
                            </Button>
                        </Link>
                    </div>) : (
                        <div className={classes.buttons}>
                            <DirectionsRun className={classes.icon} />
                            <Link to="/">
                                <Button onClick={this.props.onLogOut} className={classes.label}>
                                    Log Out
                                </Button>
                            </Link>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LogButtons));