import React from 'react';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = theme => ({
    sub: {
        backgroundColor: theme.palette.primary.light,
        height: theme.spacing.unit * 6,
        marginLeft: -theme.spacing.unit,
        width: '101%',
    },
})

class Subheader extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="static" className={classes.sub}>
                    <Toolbar>
                        {this.props.isAdmin && (
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
                        {this.props.isAdmin || (
                            <Link to="Cart">
                                <Button>
                                    Cart
                                </Button>
                            </Link>
                        )}
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Subheader);