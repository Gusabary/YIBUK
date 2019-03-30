import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Subheader from './Subheader'
import LogButtons from './LogButtons';
import Logo from './Logo'
import Greeting from './Greeting'

const mapStateToProps = state => ({
    username: state.user.username,
    identity: state.user.identity,
})

const styles = theme => ({
    main: {
        backgroundColor: theme.palette.primary.main,
        marginTop: -theme.spacing.unit,
        marginLeft: -theme.spacing.unit,
        width: '101%',
    },
    greeting: {
        marginLeft: 100,
    }
})

class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="static" className={classes.main}>
                    <Toolbar>
                        <Logo />
                        <Greeting
                            className={classes.greeting}
                            username={this.props.username}
                            identity={this.props.identity}
                        />
                        <LogButtons isLoggedin={this.props.identity !== 2} />
                    </Toolbar>
                </AppBar>
                {this.props.identity !== 2 && (
                    <Subheader isAdmin={this.props.identity === 1} />
                )}
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Header));