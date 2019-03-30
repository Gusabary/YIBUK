import React from 'react'
import { Paper, withStyles, Typography, Toolbar, TextField, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import agent from '../agent'

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
    onSubmit: async (username, password) => {
        const resBody = await agent.User.signIn(username, password);
        if (resBody.error === 'You are forbidden!') {
            alert('You are forbidden!');
            return;
        }
        if (resBody.error === 'Wrong username or password!') {
            alert('Wrong username or password!');
            return;
        }
        //HTTP request is successful now.
        dispatch({ type: 'SIGN_IN', payload: resBody });
    },
    onRedirect: () =>
        dispatch({ type: 'REDIRECTED' }),
})

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        this.props.onSubmit(username, password);
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
                            Sign In
                        </Typography>
                    </Toolbar>
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

                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                        >
                            <Typography>
                                Sign In
                            </Typography>
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));