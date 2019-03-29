import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
})

class Greeting extends React.Component {
    render() {
        const { classes, username, identity } = this.props;
        return (
            <React.Fragment>
                <Typography>
                    Hi, {identity === 2 ? 'stranger' : username}!
                </Typography>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Greeting);