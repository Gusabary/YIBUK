import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
    userId: state.user.userId,
    isEnglish: state.common.isEnglish,
})

const mapDispatchToProps = dispatch => ({
    onLanguageChange: () =>
        dispatch({ type: "CHANGE_LANGUAGE" }),
})

class Header extends React.Component {
    /*constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }*/

    /*handleClick() {
        this.props.onLanguageChange();
    }*/

    render() {
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <Button>
                                e-Book
                            </Button>
                        </Link>
                        <Typography>
                            You are happy!
                        </Typography>
                        <Link to="Manage">
                            <Button>
                                Manage
                            </Button>
                        </Link>
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
            </React.Fragment>
        );
    }
}
export default /*connect(mapStateToProps, mapDispatchToProps)*/(Header);