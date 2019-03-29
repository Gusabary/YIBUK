import React from 'react';
import {  Button, Typography, withStyles} from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = theme => ({
})

class Logo extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Link to="/">
                    <Button className={classes.logo}>
                        <Typography variant='h6'>
                            YIBUK
                        </Typography>
                    </Button>
                </Link>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Logo);