import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    greeting: {
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        right: theme.spacing.unit * 6,
    }
})

class Greeting extends React.Component {
    render() {
        const { classes, username, identity } = this.props;
        return (
            <React.Fragment>
                <Typography variant='h6' className={classes.greeting}>
                    {identity === 2 ?
                        "Hi, stranger!" :
                        `Welcome back, ${username}!`
                        }
                </Typography>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Greeting);