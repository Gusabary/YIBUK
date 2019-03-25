import React from 'react'
import { Paper, withStyles, Typography, Toolbar, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import agent from '../agent'
import { Link } from 'react-router-dom'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 10,
        width: '30%',
        marginLeft: '35%',
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        marginLeft: -theme.spacing.unit * 2.5,
    },
    text: {
        marginLeft: theme.spacing.unit * 2,
    },
    link: {
        marginLeft: -theme.spacing.unit,
        fontSize: 15,
    },
    textField: {
        marginTop: theme.spacing.unit * 3,
        width: '70%',
        marginLeft: '15%',
    },
    button: {
        marginTop: theme.spacing.unit * 7,
        width: '22%',
        marginLeft: '39%',
    },

});

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onSubmit: async (username, password, email) => {
        const resBody = await agent.User.signUp(username, password, email)
        if (resBody === 403) {
            alert('Username has existed!');
            return;
        }
        dispatch({ type: 'SIGN_UP', payload: resBody })
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatedPassword: '',
            email: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatedPasswordChange = this.handleRepeatedPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }
    handleRepeatedPasswordChange(event) {
        this.setState({
            repeatedPassword: event.target.value,
        })
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { username, password, repeatedPassword, email } = this.state;
        if (password !== repeatedPassword) {
            alert('The two passwords are not the same!');
            return;
        }
        this.props.onSubmit(username, password, email);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Toolbar>
                        <AccountCircle fontSize="large" className={classes.icon} />
                        <Typography variant="h4" className={classes.text} >
                            Sign Up
                        </Typography>
                    </Toolbar>
                    <Link to="SignIn">
                        <Typography className={classes.link}>
                            Have an account?
                        </Typography>
                    </Link>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label='Username'
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            required
                        />
                        <TextField
                            type="password"
                            label='Password'
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            required
                        />
                        <TextField
                            type="password"
                            label='Repeat Password'
                            className={classes.textField}
                            value={this.state.repeatedPassword}
                            onChange={this.handleRepeatedPasswordChange}
                            required
                        />
                        <TextField
                            type="email"
                            label='Email Address'
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                        >
                            <Typography>
                                Sign Up
                            </Typography>
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));