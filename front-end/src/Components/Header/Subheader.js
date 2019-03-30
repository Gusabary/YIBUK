import React from 'react';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AssessmentOutlined from '@material-ui/icons/AssessmentOutlined'
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined'
import AssignmentTurnedInOutlined from '@material-ui/icons/AssignmentTurnedInOutlined'
import WidgetsOutlined from '@material-ui/icons/WidgetsOutlined'

const styles = theme => ({
    sub: {
        backgroundColor: theme.palette.primary.light,
        height: theme.spacing.unit * 6,
        marginLeft: -theme.spacing.unit,
        width: '101%',
    },
    buttons: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    icon: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
    },
    label: {
        marginTop: -theme.spacing.unit * 1.5,
    },
})

class Subheader extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="static" className={classes.sub}>
                    <Toolbar>
                        <div className={classes.buttons}>
                            {this.props.isAdmin && (
                                <React.Fragment>
                                    <WidgetsOutlined className={classes.icon} />
                                    <Link to="Manage">
                                        <Button className={classes.label}>
                                            Manage
                                        </Button>
                                    </Link>
                                </React.Fragment>
                            )}

                            <AssessmentOutlined className={classes.icon} />
                            <Link to="Statistics">
                                <Button className={classes.label}>
                                    Statistics
                            </Button>
                            </Link>
                            <AssignmentTurnedInOutlined className={classes.icon} />
                            <Link to="Orders">
                                <Button className={classes.label}>
                                    Orders
                            </Button>
                            </Link>
                            {this.props.isAdmin || (
                                <React.Fragment>
                                    <ShoppingCartOutlined className={classes.icon} />
                                    <Link to="Cart">
                                        <Button className={classes.label}>
                                            Cart
                                        </Button>
                                    </Link>
                                </React.Fragment>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Subheader);