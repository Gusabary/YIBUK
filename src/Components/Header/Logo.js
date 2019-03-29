import React from 'react';
import {  Button, Typography, withStyles} from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = theme => ({
    logo: {
        fontFamily: "STXingkai",
        //fontWeight: "bold",
        fontSize: 26,
        //color: '#ffff00'
    }
})

class Logo extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Link to="/">
                    <Button className={classes.logo}>
                        <Typography variant='h6' className={classes.logo}>
                            YIBUK
                        </Typography>
                    </Button>
                </Link>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Logo);