import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Button, TextField, Typography, withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
    identity: state.user.identity,
})

const mapDispatchToProps = dispatch => ({
    onLogOut: () =>
        dispatch({type:"LOG_OUT"})
})

const styles = theme => ({
    main: {
        backgroundColor: theme.palette.primary.main,
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
                        <Link to="/">
                            <Button>
                                e-Book
                            </Button>
                        </Link>
                        <Typography>
                            You are
                            {this.props.identity === 0 && ' Visitor'}
                            {this.props.identity === 1 && ' Customer'}
                            {this.props.identity === 2 && ' Administrator'}
                            {this.props.identity}
                        </Typography>
                        {this.props.identity === 0 ? (
                            <div>
                                <Link to="SignIn">
                                    <Button>
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="SignUp">
                                    <Button>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>) : (
                                <Link to="/">
                                    <Button onClick={this.handleLogOut}>
                                        Log Out
                                    </Button>
                                </Link>
                            )}
                    </Toolbar>
                </AppBar>
                {this.props.identity !== 0 && (
                    <AppBar position="static" className={classes.sub}>
                        <Toolbar>
                            {this.props.identity === 2 && (
                                <Link to="Manage">
                                    <Button>
                                        Manage
                                </Button>
                                </Link>
                            )}

                            <Link to="Statistics">
                                <Button>
                                    Statistics
                            </Button>
                            </Link>
                            <Link to="Orders">
                                <Button>
                                    Orders
                            </Button>
                            </Link>
                            <Link to="Cart">
                                <Button>
                                    Cart
                            </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                )}
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Header));