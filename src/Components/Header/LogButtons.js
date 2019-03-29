import React from 'react';
import { connect } from 'react-redux';
import { Button, withStyles} from '@material-ui/core';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onLogOut: () =>
        dispatch({ type: "LOG_OUT" })
})

const styles = theme => ({
})

class LogButtons extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {!this.props.isLoggedin ? (
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
                            <Button onClick={this.props.onLogOut}>
                                Log Out
                            </Button>
                        </Link>
                    )}
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LogButtons));